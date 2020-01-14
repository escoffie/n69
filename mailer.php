<?php

// ¿A dónde se enviarán los mensajes del formulario?
define("CONTACT_FORM", 'bernardoescoffie@gmail.com');

// CAPTCHA

if(isset($_POST['token'])) {

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

    if($res['success'] == true) {
        

        echo "Gracias por comunicarse a Notaría 69. Pronto nos comunicaremos de vuelta con usted.";
    } else {
        echo "El mensaje no pudo ser enviado. Intente de nuevo más tarde.";
    }

}