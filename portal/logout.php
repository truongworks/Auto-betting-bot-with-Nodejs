<?php 
    if(!isset($_SESSION)){
        session_start();
    }
    if(isset($_SESSION["userData"]) && !empty($_SESSION["userData"])){
    	unset($_SESSION["userData"]);
    	session_destroy();
    }
    header("Location: index.php");
?>