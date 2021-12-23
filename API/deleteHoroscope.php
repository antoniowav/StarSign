<?php
try {

    session_start();


    require("./horoscopeList.php");
    if(isset($_SERVER['REQUEST_METHOD'])) {
    
        if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
            if($_SESSION['horoscope']) {
             session_destroy();
             echo json_encode(true);
        
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