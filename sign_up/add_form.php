<html>
<head><title>sign up</title>
</head>
<body onload="document.getElementById('name').focus();">
    <div id="logo">Seadog</div>
    <div>계정 만들기</div>
    <form name="add_form" action="add_db.php" method="post">
    <div name="container">
    <div name="name">name</div>
    <input type="text" id="name" name="name" onblur="test()">
    <div name="id">id</div>
    <input type="text" name="id">
    <div name="password">password</div>
    <input type="password" name="password">
    <div name="pw_ck">password check</div>
    <input type="password" name="pw_ck">
    <div><input type="submit" name="submit" value="next"></div>
    </form>
</body>
</html>

<script>
    function test() {
    var name = document.getElementById('name').value;
    document.cookie = "name=" + name;
    console.log(document.cookie);
    document.open('chk_name.php','chk_name','width=100, height=100');
    }
</script>