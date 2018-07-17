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





var emailReg = "";

function regUser() {

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var passC = document.getElementById("passC").value;
  var bdate = document.getElementById("bdate").value;


  if (name.length <= 2) {
    showNotif("Please enter a valid name.");
    return;
  }

  if (email.length <= 5 || !email.includes("@")) {
    showNotif("Please enter a valid email ID.");
    return;
  }

  if (pass.length <= 7) {
    showNotif("Please enter a password with at least 8 characters.");
    return;
  }



  if (pass != passC) {
    showNotif("Passwords do not match.");
    return;
  }
  if (bdate.length < 10) {
    showNotif("Please enter a valid birth date.");
    return;
  }

  emailReg = email;
  submitFormAsync(name, email, pass);

}


function submitFormAsync(name, email, pass) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      reqListenerReg(xmlHttp.responseText);
  };

  var url = "http://" + domain + "/center/reg-login.php?";
  url += "intent=register";
  url += "&name=" + name;
  url += "&email=" + email;
  url += "&pass=" + pass;

  url = encodeURI(url);
  console.log(url);

  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}




function reqListenerReg(rsp) {
  if (rsp == "1") {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("registered").style.display = "block";
    document.getElementById("resend").style.display = "block";
    document.getElementById("re-email").value = emailReg;

  } else if (rsp == "need_to_verify") {

    document.getElementById("register-form").style.display = "none";
    document.getElementById("resend").style.display = "block";
    document.getElementById("resendNotif").style.display = "block";
    document.getElementById("re-email").value = emailReg;

  } else if (rsp == "already_exists") {
    showNotif("User already registered. Try logging in.");
  } else {
    showNotif("Something went wrong. Please try again.");
  }

}





function resend() {

  // var name = document.getElementById("name").value;
  var email = document.getElementById("re-email").value;
  // var pass = document.getElementById("pass").value;
  // var passC = document.getElementById("passC").value;



  if (email.length <= 5 || !email.includes("@")) {
    showNotif("Please enter a valid email ID.");
    return;
  }


  emailReg = email;
  resendAsync(email);

}
bdate.max = new Date().toISOString().split("T")[0];

// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();
//  if(dd<10){
//         dd='0'+dd
//     }
//     if(mm<10){
//         mm='0'+mm
//     }
//
// today = yyyy+'-'+mm+'-'+dd;
// document.getElementById("datefield").setAttribute("max", today);



function resendAsync(email) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      reqListenerResend(xmlHttp.responseText);
  };

  var url = "http://" + domain + "/center/reg-login.php?";
  url += "intent=resendVerification";
  url += "&email=" + email;

  url = encodeURI(url);
  console.log(url);

  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}




function reqListenerResend(rsp) {
  if (rsp == "1") {
    document.getElementById("resend").innerHTML = "Verification email has been re-sent";
  } else {
    showNotif("Something went wrong. Please try again.");
  }

}

function goto() {
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
