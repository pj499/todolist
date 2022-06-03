var oldPassword = document.getElementById('toggleOldPassword');
var oldPasswordInput = document.getElementsByClassName('password-input')[0];
// var toggleOldPassword = false;
oldPassword.addEventListener('mousedown',function(e){
     // toggle the type attribute
     const type = oldPasswordInput.getAttribute("type") === "password" ? "text" : "password";
     oldPasswordInput.setAttribute("type", type);
     
     // toggle the icon
     this.classList.toggle("bi-eye");
});