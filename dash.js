(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict









// document.onload(){
//
// }


function check(form) /*function to check userid & password*/ {
  /*the following code checkes whether the entered userid and password are matching*/
  if (form.app_name.value == "app_name" && form.app_description.value == "app_des") {
    window.open('#'); /*opens the target page while Id & password matches*/
  } else {
    alert("Error"); /*displays error message*/
  }
}

var emailReg = "";

function CreateApp() {


  var app_name = document.getElementById("app_name").value;
  var app_des = document.getElementById("app_des").value;
  //  var email = '<%= session.getAttribute("email") %>';




  if (app_name.length <= 2) {
    showNotif("Please enter a valid app name.");
    return;
  }

  if (app_des.length <= 2) {
    showNotif("Please enter more description of the app.");
    return;
  }

  // var lol = document.getElementById('app_name').value;
  // var omg = document.getElementById('app_des').value;
  // var table = document.getElementById("myTable");
  // var row = table.insertRow(0);
  // var cell1 = row.insertCell(0);
  // var cell2 = row.insertCell(1);
  //
  //
  // cell1.innerHTML = lol;
  // cell2.innerHTML = omg;

  // emailReg = email;
  submitFormAsync(app_name, app_des);


}


function submitFormAsync(app_name, app_des) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      reqListenerReg(xmlHttp.responseText);
  };

  var url = "http://" + domain + "/center/apps.php?";
  url += "intent=create_app";
  url += "&app_name=" + app_name;
  url += "&app_des=" + app_des;
  url += "&email=" + email;

  url = encodeURI(url);
  console.log(url);

  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}



function reqListenerReg(rsp) {
  if (rsp == "1") {
    window.location = "/api/dashboard";
  } else if (rsp == "not_active") {
    showNotif("Your account is not active yet. Please return to the register page and try registering again to generate an activation link");
  } else if (rsp == "0") {
    showNotif("Enter correct App name or App description.");
  } else {
    //console.log(rsp);

    //showNotif("A new App is added.");
    //decode json and populate table
  }


}

function DeleteApp(a, e) {
  // alert(e);
  // alert(a);
  var client_id = a;
  var email = e;

  //take user input/confirmation
  var r = confirm("Are you sure you want to delete this app ?");
  if (r) {
    //write redirection code
    // showNotif("App disabled");
    submitFormAsyncDelete(client_id, email);
  } else {
    //do nothing
  }


}

function submitFormAsyncDelete(client_id, email) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      reqListenerDel(xmlHttp.responseText);
  };

  var url = "http://" + domain + "/center/apps.php?";
  url += "intent=delete_app";
  // url += "&app_name=" + app_name;
  // url += "&app_des=" + app_des;
  url += "&email=" + email;
  url += "&client_id=" + client_id;

  url = encodeURI(url);
  console.log(url);

  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function reqListenerDel(rsp) {
  if (rsp == "1") {
    //  confirm("");
    window.location = "/api/dashboard";
  } else {
    //console.log(rsp);
    showNotif("Something went wrong.");

  }
}



var modal = document.getElementById('myModal');

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";

};


span.onclick = function() {
  modal.style.display = "none";

};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


function logout() {
  window.location = "/api/login";
}


function showNotif(txt) {
  var notif = document.getElementById("notif");
  notif.style.display = "block";
  notif.innerHTML = txt;

  setTimeout(clearNotif, 3000);
}

function clearNotif() {
  var notif = document.getElementById("notif");
  notif.style.display = "none";

}
