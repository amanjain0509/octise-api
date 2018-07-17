<?php

require_once("include_classes.php");

class User
{
    private $db;
    private static $key_JWT = "someRandomKey";

    public function __construct()
    {
        $this->db = new Dbase();
    }


    public static function getDataFromJWT($jwt)
    {
        // echo "hi";
        try {
            $decoded = JWT::decode($jwt, self::$key_JWT, array('HS256'));
            $decoded = json_decode(json_encode($decoded), true);
            return $decoded['email'];
        } catch (Exception $e) {
            die("0");
        }
        // // print_r($decoded);
      // die();
    }

    public function registerUser($name, $email, $pass)
    {
        $old = $this->db->fetchOne("select * from dev_users where email = '$email'");
        if (!empty($old)) {
            if ($old['active'] == 0) {
                return "need_to_verify";
            }
            if ($old['active'] == 1) {
                return "already_exists";
            }
        }

        $this->db->prepareInsert(array(
            "name"=>$name,
            "email"=>$email,
            "pass"=>md5($pass),
            "valid_token"=> md5($email." ".time()),
            "valid_ts"=> time() + 600

        ));
        if ($this->db->insert("dev_users")) {
            // TODO: send email
            return 1;
        }

        // $this->db->prepareUpdate()

        return "0";
    }

    public function resendVerification($email)
    {
        $old = $this->db->fetchOne("select * from dev_users where email = '$email' and active = 1");
        if (!empty($old)) {
            return "0";
        }

        $this->db->prepareUpdate(array(
            "valid_token"=> md5($email." ".time()),
            "valid_ts"=> time() + 600
        ), array(
            "email"=>$email
        ));
        if ($this->db->update("dev_users")) {
            // TODO: send email
            return 1;
        }

        // $this->db->prepareUpdate()

        return "0";
    }


    public function activateAccount($email, $token)
    {

        // $token = $this->db->escape($token);
        // $email = $this->db->escape($email);

        // die("select * from dev_users where email = '$email' and valid_token = '$token' and valid_ts >= ". time());

        $old = $this->db->fetchOne("select * from dev_users where email = '$email' and valid_token = '$token' and valid_ts >= ". time());
        if (empty($old)) {
            return "0";
        }

        $this->db->prepareUpdate(array(
            "active"=> 1
        ), array(
            "email"=>$email
        ));
        if ($this->db->update("dev_users")) {
            // TODO: send email
            return 1;
        }
        return "0";
    }

    public function loginUser($email, $pass)
    {
        $email = $this->db->escape($email);
        $pass = md5($this->db->escape($pass));

        $check = $this->db->fetchOne("select * from dev_users where email = '$email' and pass = '$pass'");

        if (empty($check)) {
            return "0";
        } else {
            if ($check['active'] == 1) {
                $token = array(
                    "email" => $email,
                    "exp" => time() + (60*60*24)
                );

                $jwt = JWT::encode($token, self::$key_JWT);

                return "1|".$jwt;
            } else {
                return "not_active";
            }
        }

        return "0";
    }

    public function getAllAppsByUserId($email)
    {
        $obj =  $this->db->fetchAll("select * from myapps where email = '$email' and active = '1'");
        return json_encode($obj);
    }

    public function create_app($app_name, $app_des, $email)
    {
        $this->db->prepareInsert(array(
            "email"=>$email,
            "app_name"=>$app_name,
                        "app_description"=> $app_des,
            "client_id"=> uniqid(),
            "client_secret"=>uniqid(),
            "valid_token"=> md5($app_name." ".time())
        ));
        if ($this->db->insert("myapps")) {
            // TODO: send email
            return "1";
        }

        return "0";
    }

    public function delete_app($email, $client_id)
    {
        $this->db->prepareUpdate(array(
                        "active"=> 0
                    ), array(
                        "client_id"=>$client_id,
                    //	"app_name"=>$app_name,
                         "email"=>$email
                    ));
        if ($this->db->update("myapps")) {
            // TODO: send email
            return 1;
        }
        return "0";
    }
}
