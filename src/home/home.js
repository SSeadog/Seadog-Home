function chk_login() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText) {
        var p = document.getElementById("login");
        var lgBtn = document.getElementById("lgBtn");
        p.removeChild(lgBtn);
        var usernameSpan = document.createElement("span");
        usernameSpan.innerHTML = this.responseText;
        p.appendChild(usernameSpan);
        var logoutBtn = document.createElement("input");
        logoutBtn.type = "button";
        logoutBtn.value = "logout";
        logoutBtn.addEventListener("click", logout);
        p.appendChild(logoutBtn);
      }
    }
  };
  xhttp.open("GET", "../login/php/chk_login.php", true);
  xhttp.send();
}

function logout() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText) {
        location.reload();
      }
    }
  };
  xhttp.open("GET", "../login/php/logout.php", true);
  xhttp.send();
}
