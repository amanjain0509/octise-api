<?php

require_once("include_classes.php");

class Apps {

	private $db;

    function __construct()
    {
        $this->db = new Dbase();
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
												 "email"=>$email
										));
				if ($this->db->update("myapps")) {
						// TODO: send email
						return 1;
				}
				return "0";
		}






}

?>
