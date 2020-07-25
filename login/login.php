<?php

    include "../connect_db.php";

    $userid=$_POST['userid'];
    $userpw=$_POST['userpw'];

    $sql="select name from user_tbl where userid='$userid' and passwd='$userpw'";
    $res=mysqli_query($connect,$sql);
    $info=mysqli_fetch_row($res);

    if($info) {
        echo "<script>
        location.replace('../home/home.php');
        </script>
        ";
    } else {
        echo "fail";
        echo "<script>
        window.history.back();
        </script>";
    }

?>