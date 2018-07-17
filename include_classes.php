<?php


  $domain = "localhost/api";

  date_default_timezone_set('Asia/Calcutta');
  require_once("dbase.php");
  require_once("User.php");
  require_once("jwt/BeforeValidException.php");
  require_once("jwt/ExpiredException.php");
  require_once("jwt/JWT.php");
  require_once("jwt/SignatureInvalidException.php");
  require_once("Auth.php");
