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






document.forms[0].elements[0].focus();

 document.forms[0].onsubmit=function(){

for(var i = 0; i < document.forms[0].elements.length; i++){

var el = document.forms[0].elements[i];

if((el.className.indexOf("required") != -1) &&
  (el.value == "")){

alert("missing required field");
 el.focus();
el.style.backgroundColor="yellow";
 return false;
}

if((el.className.indexOf("numeric") != -1) &&
 (isNaN(el.value))){


alert(el.value + " is not a number");
 el.focus();
el.style.backgroundColor="pink";
 return false;
  }
 }
}
;





// document.onload(){
//
// }

function gotoreg(){
  window.location = "/api/register";
}


if(notifCode == "not_active"){
  showNotif("Your account is not active yet. Please return to the register page and try registering again to generate an activation link");
}else if(notifCode == "0"){
  showNotif("The username or password is incorrect.");
}


function check(form)/*function to check userid & password*/
{
 /*the following code checkes whether the entered userid and password are matching*/
 if(form.email.value == "email" && form.pass.value == "pass")
  {
    window.open('#');/*opens the target page while Id & password matches*/
  }
 else
 {
   alert("Error Password or Username");/*displays error message*/
  }
}


var emailReg = "";

function logInUser(){


  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;




  if(email.length <= 5 || !email.includes("@")){
    showNotif("Please enter a valid email ID.");
    return;
  }

  if(pass.length <= 7){
    showNotif("Please enter a password with at least 8 characters.");
    return;
  }



  emailReg = email;
  submitFormAsync(email, pass);

}


function submitFormAsync(email, pass) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      reqListenerReg(xmlHttp.responseText);
  };

  var url = "http://"+domain+"/center/reg-login.php?";
  url += "intent=login";
  url += "&email=" + email;
  url += "&pass=" + pass;

  url = encodeURI(url);
  console.log(url);

  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}




function reqListenerReg(rsp) {
  if (rsp == "1") {

    window.location = "/api/dashboard";

  }else if(rsp == "not_active"){
    showNotif("Your account is not active yet. Please return to the register page and try registering again to generate an activation link");
  }else{
    showNotif("The username or password is incorrect.");
  }

}





function showNotif(txt){
  var notif = document.getElementById("notif");
  notif.style.display = "block";
  notif.innerHTML = txt;

  setTimeout(clearNotif, 3000);
}

function clearNotif(){
  var notif = document.getElementById("notif");
  notif.style.display = "none";
}
