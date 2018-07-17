<?php

// print_r($_POST);
// print_r($_GET);

require_once("../classes/include_classes.php");

$arr = $_POST;

//auth

if (!isset($arr['client_id'])) {
    $response = array(
  "success" => false,
  "error" => "invalid client id"
  );

    echo json_encode($response);
    die();
}


if (!isset($arr['client_secret'])) {
    $response = array(
  "success" => false,
  "error" => "invalid client secret"
  );

    echo json_encode($response);
    die();
}



$authObj = new Auth();
$authResult = $authObj->authAppCreds($arr['client_id'], $arr['client_secret']);
if ($authResult=="0") {
    $response = array(
      "success" => false,
      "error" => "invalid app credentials"
    );

    echo json_encode($response);
    die();
}


if (!isset($arr['intent'])) {
    $response = array(
    "success" => false,
    "error" => "invalid intent"
    );

    echo json_encode($response);
    die();
}
if (!isset($arr['uid'])) {
    $response = array(
      "success" => false,
      "error" => "invalid user token"

);

    echo json_encode($response);
    die();
}



    if ($arr['intent'] == 'DISCOVER_DEVICES') {
        $res = file_get_contents("https://www.hungrybulb.com/pony/fetch-update.php/?action=getUserView&user={$arr['uid']}");


        $obj=json_decode($res, true);


        foreach ($obj as $key => $value) {
            if ($key == "modes") {
                break;
            }

            unset($obj[$key]['prod_type']);
            unset($obj[$key]['sharer']);

            $obj[$key]['group'] = $obj[$key]['land'];
            unset($obj[$key]['land']);

            foreach ($obj[$key]['nodes'] as $indexOfNode => $node) {
                if ($node['dim']=="1") {
                    // die("here");
                    $obj[$key]['nodes'][$indexOfNode]['dim']=true;
                } elseif ($node['dim']=="0") {
                    // echo true;
                    // die();
                    $obj[$key]['nodes'][$indexOfNode]['dim']=false;
                    // die("1: ".$node['dim']);
                }
            }
            // break;
        }

        //  echo json_encode($obj);
    } elseif ($arr['intent'] == 'GET_LIVE_STATES') {
        $res = file_get_contents("https://www.hungrybulb.com/pony/relay.php/?object=user&user={$arr['uid']}");
        echo $res;
        die();
    } elseif ($arr['intent'] == 'SET_ON_OFF') {
        if (!isset($arr['devId'])) {
            $response = array(
              "success" => false,
              "error" => "invalid device id"
            );

            echo json_encode($response);
            die();
        }

        if (!isset($arr['node'])) {
            $response = array(
              "success" => false,
              "error" => "invalid node."
            );

            echo json_encode($response);
            die();
        }

        if (!isset($arr['state'])) {
            $response = array(
              "success" => false,
              "error" => "invalid state."
            );

            echo json_encode($response);
            die();
        }


        if ($arr['state']<0) {
            $arr['state'] = 0;
        }
        if ($arr['state']>100) {
            $arr['state'] = 100;
        }

        $arr['state']=100-$arr['state'];
        $arr['state']=$arr['state']/100;
        $arr['state']=$arr['state']*9;
        $arr['state']=round($arr['state']);



        $myvars= array(
          $arr['devId']=>$arr['node'].$arr['state']
        );
        $commandJson= json_encode($myvars);


        $res = file_get_contents("https://www.hungrybulb.com/pony/relay.php/?object=user&user={$arr['uid']}&togCommand={$commandJson}");

        die($res);
    } elseif ($arr['intent'] == 'SET_TIMER') {

      if (!isset($arr['devId'])) {
          $response = array(
            "success" => false,
            "error" => "invalid device id"
          );

          echo json_encode($response);
          die();
      }

      if (!isset($arr['node'])) {
          $response = array(
            "success" => false,
            "error" => "invalid node."
          );

          echo json_encode($response);
          die();
      }


      if (!isset($arr['state'])) {


        sleep(5);
            $arr['state']=0;

            $myvars= array(
              $arr['devId']=>$arr['node'].$arr['state']
            );
            $commandJson= json_encode($myvars);


            die($commandJson);

      }

        $res = file_get_contents("https://www.hungrybulb.com/pony/relay.php/?object=user&user={$arr['uid']}&togCommand={$commandJson}");
      die($res);


    }
     else {
        $response = array(
          "success" => false,
          "error" => "invalid intent"
        );

        echo json_encode($response);

        die();
    }
