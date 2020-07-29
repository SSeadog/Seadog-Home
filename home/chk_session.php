<?php
    session_start();
    if(isset($_SESSION['ses_userid']) && isset($_SESSION['ses_userpw'])) {
        $userid=$_SESSION['ses_userid'];
        $userpw=$_SESSION['ses_userpw'];
    
        include "../connect_db.php";
    
        $sql="select name from user_tbl where userid='$userid' and passwd='$userpw'";
        $res=mysqli_query($connect,$sql);
        $info=mysqli_fetch_row($res);
    
        if($info) {
            echo "$info[0]";
        }
        mysqli_close($connect);
    }
?>