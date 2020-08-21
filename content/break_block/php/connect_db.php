<?php
    $host = "localhost";
    $user = "root";
    $passwd = "";
    $connect = mysqli_connect($host, $user, $passwd) or die("mysql 접속 에러");
    $db = mysqli_select_db($connect, 'rank');
    mysqli_select_db($connect, 'rank') or die("DB 접속 에러");
?>