var regex = /^[a-zA-Z ]{2,30}$/;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
var phoneRegex = /^\d{8}$/;
var usernameRegex = /^[a-z0-9_-]{3,16}$/;
const VALUE_FALSE = "0";
const VALUE_TRUE = "1";

function nameFunction() {

  var name = document.getElementById('last_name').value;
  if (name == null || name == "" || !regex.test(name)) {
    document.getElementById('name-msg').textContent = 'Please, enter a valid name';
    document.getElementById('name-msg').style.opacity = 100;
    document.getElementById('last_name').classList.add('inputError');
    document.getElementById('last_name').classList.remove('inputValid');
    return false;
  } else
    document.getElementById('name-msg').textContent = 'Please, enter a valid name';
  document.getElementById('name-msg').style.opacity = 0;
  document.getElementById('last_name').classList.remove('inputError');
  document.getElementById('last_name').classList.add('inputValid');
  return true;
}

function firstnameFunction() {
  var firstname = document.getElementById('first_name').value;
  if (firstname == null || firstname == "" || !regex.test(firstname)) {
    document.getElementById('prenom-msg').textContent = 'Please, enter a valid name';
    document.getElementById('prenom-msg').style.opacity = 100;
    document.getElementById('first_name').classList.add('inputError');
    document.getElementById('first_name').classList.remove('inputValid');
    return false;
  } else
    document.getElementById('prenom-msg').textContent = 'Please, enter a valid name';
  document.getElementById('prenom-msg').style.opacity = 0;
  document.getElementById('first_name').classList.remove('inputError');
  document.getElementById('first_name').classList.add('inputValid');
  return true;
}

function usernameFunction() {
  var username = document.getElementById('username').value;
  if (username == null || username == "" || !usernameRegex.test(username)) {
    document.getElementById('username-msg').textContent = 'Please, enter a valid Username, it can contain special caracters';
    document.getElementById('username-msg').style.opacity = 100;
    document.getElementById('username').classList.add('inputError');
    document.getElementById('username').classList.remove('inputValid');
    return false;
  } else
    document.getElementById('username-msg').textContent = 'Please, enter a valid name';
  document.getElementById('username-msg').style.opacity = 0;
  document.getElementById('username').classList.remove('inputError');
  document.getElementById('username').classList.add('inputValid');
  return true;
}

function emailFunction() {
  var email = document.getElementById('email').value.toLowerCase();
  if (email == null || email == "" || !emailRegex.test(email)) {
    document.getElementById('email-msg').textContent = 'Please, enter a valid email (xxx@xx.xx)';
    document.getElementById('email-msg').style.opacity = 100;
    document.getElementById('email').classList.add('inputError');
    document.getElementById('email').classList.remove('inputValid');
    return false;
  } else
    document.getElementById('email-msg').textContent = 'Please, enter a valid email (xxx@xx.xx)';
  document.getElementById('email-msg').style.opacity = 0;
  document.getElementById('email').classList.remove('inputError');
  document.getElementById('email').classList.add('inputValid');
  return true;
}

function passwordFunction() {
  var password = document.getElementById('password').value;
  if (!passwordRegex.test(password)) {
    document.getElementById('password-msg').textContent = 'The password must be at least 6 caracters, at least 1 Uppercase';
    document.getElementById('password-msg').style.opacity = 100;
    document.getElementById('password').classList.add('inputError');
    document.getElementById('password').classList.remove('inputValid');
    return false;
  } else
    document.getElementById('password-msg').textContent = 'The password must be at least 6 caracters, at least 1 Uppercase';
  document.getElementById('password-msg').style.opacity = 0;
  document.getElementById('password').classList.remove('inputError');
  document.getElementById('password').classList.add('inputValid');
  return true;
}

function passwordConfirmFunction() {
  var password = document.getElementById('password').value;
  var passwordConfirm = document.getElementById('confirmedPassword').value;
  if (password.length != passwordConfirm.length || passwordConfirm != password || passwordConfirm ==="") {
    document.getElementById('passwordConfMsg').textContent = 'Please confirm the password';
    document.getElementById('passwordConfMsg').style.opacity = 100;
    document.getElementById('confirmedPassword').classList.add('inputError');
    document.getElementById('confirmedPassword').classList.remove('inputValid');
    return false;
  } else
  document.getElementById('passwordConfMsg').textContent = 'The password must be at least 8 caracters,at least 1 Uppercase';
  document.getElementById('passwordConfMsg').style.opacity = 0;
  document.getElementById('confirmedPassword').classList.remove('inputError');
  document.getElementById('confirmedPassword').classList.add('inputValid');
  return true;
}

function selectSystemFunction() {
  var selectedIndex = document.getElementById('systemId').selectedIndex;
  
  if (selectedIndex == undefined || selectedIndex == null || selectedIndex == -1) {
    document.getElementById('system-msg').textContent = 'Please choose the system to affect to the new User.';
    document.getElementById('system-msg').style.opacity = 100;
    document.getElementById('systemId').classList.add('inputError');
    document.getElementById('systemId').classList.remove('inputValid');
    return false;
  } else
  document.getElementById('system-msg').style.opacity = 0;
  document.getElementById('systemId').classList.remove('inputError');
  document.getElementById('systemId').classList.add('inputValid');
  return true;
}

//function adressFunction(){
//  var adress = document.getElementById('adress').value;
// if (adress==null || adress=="" ){
//   document.getElementById('adress-msg').textContent ='This field is required!';
//   document.getElementById('adress-msg').style.opacity=100;
//   document.getElementById('adress').classList.add('inputError');
//   return false;
//}
//else 
//document.getElementById('adress-msg').textContent ='This field is required!';
//document.getElementById('adress-msg').style.opacity=0;
//document.getElementById('adress').classList.remove('inputError');
//document.getElementById('adress').classList.add('inputValid');
//return true;
//  }

function telFunction() {
  var tel = document.getElementById('tel').value;
  if (!phoneRegex.test(tel) || tel == null || tel == "") {
    document.getElementById('tel-msg').textContent = 'Please, enter a valid phone number! 10 numbers !';
    document.getElementById('tel-msg').style.opacity = 100;
    document.getElementById('tel').classList.add('inputError');
    document.getElementById('tel').classList.remove('inputValid');
    return false;
  } else
    document.getElementById('tel-msg').textContent = 'Please, enter a valid phone number! 10 numbers !';
  document.getElementById('tel-msg').style.opacity = 0;
  document.getElementById('tel').classList.remove('inputError');
  document.getElementById('tel').classList.add('inputValid');
  return true;
}

function validation() {
  firstnameFunction();
  nameFunction();
  usernameFunction();
  emailFunction();
  passwordFunction();
  passwordConfirmFunction();
  telFunction();
  selectSystemFunction();
  if (!firstnameFunction() || !nameFunction() || !usernameFunction() || !emailFunction() 
    || !passwordFunction() || !telFunction() || !selectSystemFunction()) {
    sessionStorage.setItem("valid",VALUE_FALSE);  } 
  else {
    var selectedOption = document.getElementById('systemId').value;
    localStorage.setItem("selectedSystem",selectedOption.charAt(selectedOption.length-2));
    sessionStorage.setItem("valid",VALUE_TRUE);}
}

function Reset() {
  document.getElementsByClassName('form-control').value = "";
}
