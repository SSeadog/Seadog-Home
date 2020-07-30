<?php
    include "../../connect_db.php";
    $userid=$_COOKIE['userid'];
    $userpw=$_COOKIE['userpw'];
    $sql="select name from user_tbl where userid='$userid' and passwd='$userpw'";
    $res=mysqli_query($connect,$sql);
    $info=mysqli_fetch_row($res);

    if($info) {
        session_start();
        $_SESSION['ses_userid']=$userid;
        $_SESSION['ses_userpw']=$userpw;
        echo $info[0];
    }
?>