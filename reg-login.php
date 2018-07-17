<?php

if(!isset($_GET['email'])) reply("0");
if(!isset($_GET['intent'])) reply("0");

require_once("../classes/include_classes.php");

$intent = $_GET['intent'];

if($intent == "register"){

  if(invalid($_GET['pass'])) reply("0");
  if(invalid($_GET['name'])) reply("0");

  $objUser = new User();
  reply(
    $objUser->registerUser($_GET['name'], $_GET['email'], $_GET['pass'])
  );


}elseif($intent == "resendVerification"){

  $objUser = new User();
  reply(
    $objUser->resendVerification($_GET['email'])
  );

}elseif($intent == "activate"){

  if(invalid($_GET['token'])) reply("0");

  $objUser = new User();
  reply(
    $objUser->activateAccount($_GET['email'], $_GET['token'])
  );

}elseif($intent == "login"){
  //login

  $objUser = new User();
  reply(
    $objUser->loginUser($_GET['email'], $_GET['pass'])
  );

}else{
  reply("0");
}

function reply($b){
  echo $b;
  die();
}

function invalid($i){
  if(!isset($i) || empty($i)) return true;
}


 ?>
