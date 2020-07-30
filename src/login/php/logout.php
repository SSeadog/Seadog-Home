<?php
    session_start();

    unset($_SESSION['ses_userid']);
    unset($_SESSION['ses_userpw']);

    echo "true";
?>