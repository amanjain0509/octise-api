<?php

if (!isset($_GET['intent'])) {
    reply("0");
}
//if(!isset($_GET['app_name'])) reply("0");
if (invalid($_GET['email'])) {
    reply("0");
}



//$email = someFunction($_GET['email']);



require_once("../classes/include_classes.php");

$email = $_GET['email'];
$email = User::getDataFromJWT($email);

$intent = $_GET['intent'];

if ($intent == "create_app") {
    if (invalid($_GET['app_name'])) {
        reply("0");
    }
    if (invalid($_GET['app_des'])) {
        reply("0");
    }

    // TODO: change object from USer to Class

    $objUser = new User();
    reply(
    $objUser->create_app($_GET['app_name'], $_GET['app_des'], $email)
  );
} elseif ($intent == "delete_app") {
    $objUser = new User();
    reply(
    $objUser->delete_app($email, $_GET['client_id'])
  );
} elseif ($intent == "getAllApps") {

  // TODO: change object from USer to Class

    $objUser = new User();
    reply(
    $objUser->getAllAppsByUserId($email)
  );
} else {
    reply("0");
}

function reply($b)
{
    echo $b;
    //echo "hi";
    die();
}



function invalid($i)
{
    if (!isset($i) || empty($i)) {
        return true;
    }
}
