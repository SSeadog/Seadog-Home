function chk_id() {
  var id_ok = false;

  var userid = document.getElementById("userid").value;
  document.cookie = "userid=" + userid;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText) {
        var exBtn = document.getElementById("next");
        var p = document.getElementById("under");
        p.removeChild(exBtn);

        var newBtn = document.createElement("button");
        newBtn.innerHTML = "next";
        newBtn.setAttribute("id", "next2");
        p.appendChild(newBtn);
        newBtn.addEventListener("click", chk_pw);

        document.getElementById("subtitle").innerHTML = "password";

        document.getElementById("username").innerHTML =
          "Hi!! " + this.responseText;

        document.getElementById("userid").value = "";
        document.getElementById("userid").setAttribute("id", "userpw");
      } else {
        console.log(false); //일치 아이디 없다
      }
    }
  };
  xhttp.open("GET", "php/login_id.php", true);
  xhttp.send();
}

function chk_pw() {
  var userpw = document.getElementById("userpw").value;
  document.cookie = "userpw=" + userpw;

  var username = document.getElementById("username").innerHTML;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == username) {
        location.replace("../home/home.html");
      } else {
        console.log("실패"); //일치 비번 없다
      }
    }
  };
  xhttp.open("GET", "php/login_pw.php");
  xhttp.send();
}
