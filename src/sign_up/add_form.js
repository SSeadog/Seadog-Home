var name_ok = false,
  id_ok = false,
  pw_ok = false,
  pw_ck_ok = false;

function chk_name() {
  var name = document.getElementById("name").value;
  document.cookie = "name=" + name;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("name").style.cssText = this.responseText;
      if (this.responseText.indexOf("blue") > 0) {
        name_ok = true;
      } else {
        name_ok = false;
      }
      chk_data();
    }
  };
  xhttp.open("GET", "php/chk_name.php", true);
  xhttp.send();
}

function chk_id() {
  var id = document.getElementById("id").value;
  document.cookie = "id=" + id;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("id").style.cssText = this.responseText;
      if (this.responseText.indexOf("blue") > 0) {
        id_ok = true;
      } else {
        id_ok = false;
      }
      chk_data();
    }
  };
  xhttp.open("GET", "php/chk_id.php", true);
  xhttp.send();
}

function chk_pw() {
  var password = document.getElementById("password");
  if (password == null) {
  } else if (
    (password.value != null && password.value.length < 4) ||
    password.value.length > 30
  ) {
    password.style.color = "red";
    pw_ok = false;
  } else {
    password.style.color = "blue";
    pw_ok = true;
  }
  chk_data();
}

function chk_pw_ck() {
  var pw_ck = document.getElementById("pw_ck");
  var password = document.getElementById("password");

  if (pw_ck == null) {
  } else if (pw_ck.value != password.value) {
    pw_ck.style.color = "red";
    pw_ck_ok = false;
  } else {
    pw_ck.style.color = "blue";
    pw_ck_ok = true;
  }
  chk_data();
}

function chk_data() {
  if (name_ok == true && id_ok == true && pw_ok == true && pw_ck_ok == true) {
    document.getElementById("submit").style.visibility = "visible";
    document.getElementById("submit").disabled = false;
  } else {
    document.getElementById("submit").style.visibility = "hidden";
    document.getElementById("submit").disabled = true;
  }
}
