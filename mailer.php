<?php

if(isset($_POST['enviar'])) {

    print_r($_POST);

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => '6LejdcoUAAAAAOPjntXi5Kpw4wbVeB_rXPUsNOMT',
        'response' => $_POST['token'],
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    $res = json_decode($response, true);

    print_r($res);

    if($res['success'] == true) {
        echo "EXITO";
    } else {
        echo "FRACASO";
    }

}