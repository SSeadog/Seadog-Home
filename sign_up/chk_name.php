<?php

    include "../connect_db.php";

    $name=$_COOKIE['name'];
    $sql="select name from user_tbl where name='$name'";
    $res=mysqli_query($connect,$sql);
    $info=mysqli_fetch_row($res);

    if($info) {
        echo "background-color : red";
    } else if($info == null && strlen($name) < 4 || strlen($name) > 30) {
        
    } else {
        echo "background-color : blue"; //긍정의 표현 사용 가능
    }

    mysqli_close($connect);
?>