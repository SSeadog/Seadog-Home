<?php
    include "home.html";
    include "../connect_db.php";

    if($_POST['userid'] && $_POST['userpw']) {
        $userid=$_POST['userid'];
        $userpw=$_POST['userpw'];
        
        $sql="select name from user_tbl where userid = '$userid' and passwd = '$userpw'";
        $res=mysqli_query($connect, $sql);
        $info=mysqli_fetch_row($res);
    }

    if($userid && $userpw && $sql) {
        echo "<script>
        var obj = document.getElementById('login');
        obj.removeChild(btnLg);
        var newDiv = document.createElement('div');
        newDiv.innerHTML = 'Hi $info[0]';
        obj.appendChild(newDiv);
        </script>";
    }
?>