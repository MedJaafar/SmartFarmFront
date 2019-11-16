
var regex = /^[a-zA-Z ]{2,30}$/;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
var phoneRegex = /^\d{10}$/;

function nameFunction(){
    
    var name = document.getElementById('nom').value;
   if (name==null || name=="" || !regex.test(name)){
     document.getElementById('name-msg').textContent ='Please, enter a valid name';
     document.getElementById('name-msg').style.opacity=100;
     document.getElementById('nom').classList.add('inputError');
     return false;
}
else 
document.getElementById('name-msg').textContent ='Please, enter a valid name';
     document.getElementById('name-msg').style.opacity=0;
     document.getElementById('nom').classList.remove('inputError');
     document.getElementById('nom').classList.add('inputValid');
return true;
  }

  function firstnameFunction(){
    var firstname = document.getElementById('firstname').value;
   if (firstname==null || firstname=="" || !regex.test(firstname)){
     document.getElementById('prenom-msg').textContent ='Please, enter a valid name';
     document.getElementById('prenom-msg').style.opacity=100;
     document.getElementById('firstname').classList.add('inputError');
     return false;
}
else 
document.getElementById('prenom-msg').textContent ='Please, enter a valid name';
     document.getElementById('prenom-msg').style.opacity=0;
     document.getElementById('firstname').classList.remove('inputError');
     document.getElementById('firstname').classList.add('inputValid');
return true;
  }

  function emailFunction(){
    var email = document.getElementById('email').value.toLowerCase();
   if (email==null || email=="" || !emailRegex.test(email)){
     document.getElementById('email-msg').textContent ='Please, enter a valid email (xxx@xx.xx)';
     document.getElementById('email-msg').style.opacity=100;
     document.getElementById('email').classList.add('inputError');
     return false;
}
else 
document.getElementById('email-msg').textContent ='Please, enter a valid email (xxx@xx.xx)';
     document.getElementById('email-msg').style.opacity=0;
     document.getElementById('email').classList.remove('inputError');
     document.getElementById('email').classList.add('inputValid');
return true;
  }

 function passwordFunction(){
    var password = document.getElementById('password').value;
   if (!passwordRegex.test(password)){
     document.getElementById('password-msg').textContent ='Your password must be at least 8 caracters,at least 1 Uppercase';
     document.getElementById('password-msg').style.opacity=100;
     document.getElementById('password').classList.add('inputError');
     return false;
}
else 
document.getElementById('password-msg').textContent ='Your password must be at least 8 caracters,at least 1 Uppercase';
document.getElementById('password-msg').style.opacity=0;
document.getElementById('password').classList.remove('inputError');
document.getElementById('password').classList.add('inputValid');
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

  function telFunction(){
    var tel = document.getElementById('tel').value;
   if (!phoneRegex.test(tel)||tel==null || tel==""){
     document.getElementById('tel-msg').textContent ='Please, enter a valid phone number! 10 numbers !';
     document.getElementById('tel-msg').style.opacity=100;
     document.getElementById('tel').classList.add('inputError');
     return false;
}
else 
document.getElementById('tel-msg').textContent ='Please, enter a valid phone number! 10 numbers !';
     document.getElementById('tel-msg').style.opacity=0;
     document.getElementById('tel').classList.remove('inputError');
     document.getElementById('tel').classList.add('inputValid');
return true;
  }

function validation(){
  firstnameFunction(); 
  nameFunction();
  emailFunction();
  passwordFunction();
  telFunction();
  if(!firstnameFunction() && !nameFunction() && !emailFunction() && !passwordFunction() &&  !telFunction()){
   }
  else 
  document.getElementById('myform').action = "https://www.google.com";

}

function Reset(){
  document.getElementsByClassName('form-control').value ="";
  
}