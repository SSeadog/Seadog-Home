<?php
    include "../connect_db.php";

    $userid=$_POST['userid'];

    $sql="select name from user_tbl where userid = '$userid'";
    $res=mysqli_query($connect, $sql);
    $info=mysqli_fetch_row($res);
    echo $info[0];
?>

<html>
    <head>
        <title>login</title>
    </head>
    <body>
        <div><font id=S size=100>S</font></div>
        <form name="login_form_pw" action="../home/home.php" method="post">
            <div name=container>
                <div>username</div>
                <div name=password>password</div>
                <input type="hidden" id=userid name=userid value="<?php echo $userid ?>" >
                <input type="password" id=userpw name=userpw>
            </div>
            <span onClick="location.replace('login_id.html')">back</span>
            <input type="submit" name="submit" value="login">
        </form>
    </body>