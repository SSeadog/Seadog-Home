<html>
<head><title>sign up</title>
</head>
<body onload="document.getElementById('name').focus();">
    <div id="logo">Seadog</div>
    <div>계정 만들기</div>
    <form name="add_form" action="add_db.php" method="post">
    <div name="container">
    <div name="name">name</div>
    <input type="text" id="name" name="name" onkeyup="chk_name()">
    <div name="id">id</div>
    <input type="text" id="id" name="id" onkeyup="chk_id()">
    <div name="password">password</div>
    <input type="password" id="password" name="password" onkeyup="chk_pw()" onchange="chk_pw_ck()">
    <div name="pw_ck">password check</div>
    <input type="password" id="pw_ck" name="pw_ck" onkeyup="chk_pw_ck()">
    <div><input type="submit" id="submit" name="submit" value="next" style="visibility: hidden" disabled=true></div>
    </form>
    <div id="test">dd</div>
</body>
</html>

<script>
    
    var name_ok=false, id_ok=false, pw_ok=false, pw_ck_ok=false;

    function chk_name() {
        var name = document.getElementById('name').value;
        document.cookie = "name=" + name;
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                document.getElementById('name').style.cssText = this.responseText;
                if(this.responseText.indexOf("blue")>0) {
                    name_ok=true;
                } else {
                    name_ok=false;
                }
            }
        };
        xhttp.open("GET", "chk_name.php", true);
        xhttp.send();

        chk_data();
    }

    function chk_id() {
        var id = document.getElementById('id').value;
        document.cookie = "id=" + id;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                document.getElementById('id').style.cssText = this.responseText;
                if(this.responseText.indexOf("blue")>0) {
                    id_ok=true;
                } else {
                    id_ok=false;
                }
            }
        };
        xhttp.open("GET", "chk_id.php", true);
        xhttp.send();

        chk_data();
    }

    function chk_pw() {
        var password = document.getElementById('password');
        if(password == null) {

        } else if(password.value != null && password.value.length <4 || password.value.length >30) {
            password.style.color="red";
            pw_ok=false;
        } else {
            password.style.color="blue";
            pw_ok=true;
        }
        chk_data();
    }

    function chk_pw_ck() {
        var pw_ck = document.getElementById('pw_ck');
        var password = document.getElementById('password');

        if(pw_ck == null) {

        } else if(pw_ck.value != password.value) {
            pw_ck.style.color="red";
            pw_ck_ok=false;
        } else {
            pw_ck.style.color="blue";
            pw_ck_ok=true;
        }
        chk_data();
    }

    function chk_data() {
        if(name_ok==true&&id_ok==true&&pw_ok==true&&pw_ck_ok==true) {
            document.getElementById('submit').style.visibility="visible";
            document.getElementById('submit').disabled=false;
        } else {
            document.getElementById('submit').style.visibility="hidden";
            document.getElementById('submit').disabled=true;
        }
    }

</script>