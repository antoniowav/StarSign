<?php 
session_start();

try {

    require("./horoscopeList.php");
    if(isset($_SERVER['REQUEST_METHOD'])) {
    
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            if(isset($_POST["date"])) {
                
             
                if(!isset($_SESSION["horoscope"])){

                    $date = json_decode($_POST['date'], true);
                    $horoscope = getHoroscope($date);
                    $_SESSION["horoscope"] = serialize($horoscope); 
                    
                    echo json_encode(true);
                    echo json_encode($horoscope);
                    
                    error_log(json_encode($horoscope));
                    error_log(json_encode($date));
                    
                    exit;

                } else {
                    json_encode(false);
                    
                }
        
            } else {
                echo json_encode("Select a date!");
                exit;
            }
    
        }  else {
            throw new Exception("Something went wrong!", 405);
        } 
    
    }

} catch(Exception $err) {
    http_response_code($err -> getCode());
    echo json_encode($err -> getMessage());
    exit;
}
