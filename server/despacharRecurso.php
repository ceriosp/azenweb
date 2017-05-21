<?php
    //Obtener objeto JSON enviado desde el cliente
    $jsonRequest = file_get_contents("php://input");    
    $requestObj = json_decode(jsonRequest);

    echo $requestObj->ctx;
?>