<?php
    include "../connect_db.php";

    $userid=$_POST['userid'];

    $sql="select name from user_tbl where userid = '$userid'";
    $res=mysqli_query($connect, $sql);
    $info=mysqli_fetch_row($res);

    // 관리를 위해 이 부분은 따로 파일을 만들어 두는 게 좋을 듯
    if(!($info)) {
        echo "<script>
        location.replace('login_id.php');
        </script>";
        // login_id.php에 일치 id가 없다고 알릴만한 js 작업 필요
    } else {

    }

    mysqli_close($connect);
?>

<html>
    <head>
        <title>login</title>
    </head>
    <body>
        <div><font id=S size=100>S</font></div>
        <form name="login_form_pw" action="login.php" method="post">
            <div name=container>
                <div><?php echo $info[0]; ?></div>
                <div name=password>password</div>
                <input type="hidden" id=userid name=userid value="<?php echo $userid ?>">
                <input type="password" id=userpw name=userpw>
            </div>
            <span onClick="location.replace('login_id.php')">back</span>
            <input type="submit" name="submit" value="login">
        </form>
    </body>
</html>