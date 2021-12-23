<?php 

try {
    require("./horoscopeList.php");
    session_start();
    if(isset($_SERVER['REQUEST_METHOD'])) {
    
        if($_SERVER['REQUEST_METHOD'] === 'GET'){
                if(isset($_SESSION["horoscope"])){
                    
                    echo json_encode(unserialize($_SESSION["horoscope"]));
                    exit;
                    
                } else {
                echo json_encode(false);
            }
    
        } else {
            throw new Exception("Something went wrong!", 405);
        }
    
    }

} catch(Exception $err) {
    http_response_code($err -> getCode());
    echo json_encode($err -> getMessage());
    exit;
}



?>