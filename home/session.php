<?php
    //need to change session_login.php

    session_start();

    $userid=$_POST('userid');
    $userpw=$_POST('userpw');

    $_SESSION['ses_userid']=$userid;
    $_SESSION['ses_userpw']=$userpw;
?>