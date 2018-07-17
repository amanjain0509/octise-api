<?php



require_once("include_classes.php");

class Auth
{
    private $db;

    public function __construct()
    {
        $this->db = new Dbase();
    }


    public function authAppCreds($client_id, $client_secret)
    {
        $obj = $this->db->fetchOne("select * from myapps where client_id = '$client_id' and client_secret = '$client_secret' and active = 1");

        if (!empty($obj)) {
            return "1";
        } else {
            return "0";
        }

        return "0";
    }




}
