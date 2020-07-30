<?php
    include "../../connect_db.php";

    $userid=$_COOKIE['userid'];
    $sql="select name from user_tbl where userid='$userid'";
    $res=mysqli_query($connect,$sql);
    $info=mysqli_fetch_row($res);

    if($info) {
        echo "$info[0]";
    }
?>