<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['type'])) {
    $type = $_POST['type']; //1:crawl lịch sử, 2:clone bet
    if ($type == 1) {
        $output = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\crawbattle.js");

    } else if ($type == 2) {
        $outputbetwin = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\pet_betwins.js");
    } else if ($type == 3) {
        $outputbetwin = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\pet_10stack.js");
    } else if ($type == 4) {
        $outputbetwin = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\8platinum.com.js");
    } else if ($type == 5) {
        $outputbetwin = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\pet_2bet.js");
    } else if ($type == 6) {
        $outputbetwin = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\loginibet.js");
    } else if ($type == 7) {
        $outputbetwin = shell_exec("cd D:\Redbolt\Implementation\Website\crawler && node .\pages\LoginPig11.js");
    } else {
        //chay betwwin
        echo $type;
    }
}
?>