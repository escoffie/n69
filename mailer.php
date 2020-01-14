<?php

error_reporting(E_ALL ^ E_NOTICE);

// ¿A dónde se enviarán los mensajes del formulario?
define("CONTACT_FORM", 'david.evia@notaria69yucatan.com.mx');

// CAPTCHA

if (isset($_POST['token'])) {

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => '6LejdcoUAAAAAOPjntXi5Kpw4wbVeB_rXPUsNOMT',
        'response' => $_POST['token'],
        'remoteip' => $_SERVER['REMOTE_ADDR'],
    ];

    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    $res = json_decode($response, true);

    if ($res['success'] == true) {

        $post = (!empty($_POST)) ? true : false;

        if ($post) {

            $name = stripslashes($_POST['nombre']);
            $email = trim($_POST['email']);
            $phone = trim($_POST['telefono']);
            $subject = stripslashes($_POST['asunto']);
            $message = stripslashes($_POST['mensaje']);

            $message = "Nombre: $name
    Email: $email
    Teléfono: $phone
    Asunto: $subject
    Fecha: " . date('Y-m-d H:i:s') . "

    Mensaje:
    $message";

            $error = '';

            // Check name

            if (!$name) {
                $error .= 'Por favor, proporciona tu nombre completo.<br />';
            }

            // Check email

            if (!$email) {
                $error .= 'Por favor, proporciona tu dirección de email.<br />';
            }

            if ($email && !ValidateEmail($email)) {
                $error .= 'Verifica si tu email está bien escrito.<br />';
            }

            // Check message (length)

            if (!$message || strlen($message) < 10) {
                $error .= "Por favor, escribe un mensaje ¿Qué podemos hacer por ti?<br />";
            }

            if (!$error) {
                $mail = mail(CONTACT_FORM, $subject, $message,
                    "From: " . $name . " <" . $email . ">\r\n"
                    . "Reply-To: " . $email . "\r\n"
                    . "X-Mailer: PHP/" . phpversion());

                if ($mail) {
                    echo "Gracias por comunicarse a Notaría 69. Pronto nos comunicaremos de vuelta con usted.";
                }

            } else {
                echo $error;
            }

        }


    } else {
        echo "El mensaje no pudo ser enviado. Intente de nuevo más tarde.";
    }

}

function ValidateEmail($value)
{
    $regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

    if ($value == '') {
        return false;
    } else {
        $string = preg_replace($regex, '', $value);
    }

    return empty($string) ? true : false;
}
