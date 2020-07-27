<?php
    include "home.html";
    include "../connect_db.php";

    $name=$_POST['name'];

    if($name) {
        echo "<script>
        var obj = document.getElementById('login');
        obj.removeChild(btnLg);
        var newDiv = document.createElement('div');
        newDiv.innerHTML = 'Hi $name ';
        obj.appendChild(newDiv);
        </script>";
    }
?>