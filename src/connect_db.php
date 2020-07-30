<?php
    $host = "localhost";
    $user = "root";
    $passwd = "";
    $connect = mysqli_connect($host, $user, $passwd) or die("mysql서버 접속 에러");
    $db = mysqli_select_db($connect, 'login_user_db');
    mysqli_select_db($connect, 'login_user_db') or die("DB 접속 에러");
?>