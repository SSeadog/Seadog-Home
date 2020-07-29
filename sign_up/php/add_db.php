<?php
    include "../../connect_db.php";

    $username=$_POST['name'];
    $userid=$_POST['id'];
    $userpw=$_POST['password'];

    $sql="insert into user_tbl(userid,name,passwd) values('$userid','$username','$userpw')";
    $res=mysqli_query($connect, $sql);

    if($res) {
        echo "등록 성공";

        echo "<button onClick=location.replace('../home/home.php')>Click</button>";
    } else {
        echo "등록 실패";
    }

    mysqli_close($connect);
?>