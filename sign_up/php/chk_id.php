<?php
    include "../../connect_db.php";

    $id=$_COOKIE['id'];
    $sql="select userid from user_tbl where userid='$id'";
    $res=mysqli_query($connect,$sql);
    $info=mysqli_fetch_row($res);

    if($info) {
        echo "background-color : red";
    } else if($info == null && strlen($id) < 4 || strlen($id) > 30) {

    } else {
        echo "background-color : blue";
    }
    mysqli_close($connect);
?>