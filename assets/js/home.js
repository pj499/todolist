var create_account=document.getElementById("create-account");
var sign_in_form_div=document.getElementById("sign-in-form");
var sign_up_form_div=document.getElementById("sign-up-form");
var manual_sign_in=document.getElementById("manual-sign-in");
var create_account=document.getElementById("create-account");
var sign_in_redirect= document.getElementById("sign-in-redirect");
var input_phone=document.getElementById("phone-number")
var rotate_form=0;
var rotate_sign_up=0;
sign_up_form_div.style.display='none';

create_account.addEventListener('click',function(e){
    rotate_sign_up+=180;
    rotate_form+=180;

    sign_in_form_div.style.transform=`rotate3d(0,1,0,${rotate_form}deg)`;
    if((rotate_form/180)%2!=0){
        setTimeout(function(){
        sign_in_form_div.style.display='none';
        sign_up_form_div.style.display='block';
        },650);
    }else{
        sign_in_form_div.style.display='block';
        sign_up_form_div.style.display='none';
    }
});


sign_in_redirect.addEventListener('click', function(event){
    event.preventDefault();

    rotate_sign_up+=180;
    rotate_form+=180;

    sign_up_form_div.style.transform= `rotate3d(0,1,0,${rotate_sign_up}deg)`;

    if((rotate_sign_up/180)%2==0){
        setTimeout(function(){
        sign_in_form_div.style.transform=`rotate3d(0,1,0,${rotate_form}deg)`;
        sign_in_form_div.style.display='block';
        sign_up_form_div.style.display='none';
        },550);
    }else{
        sign_in_form_div.style.display='none';
        sign_up_form_div.style.display='block';
    }
});

input_phone.addEventListener('keypress',function(e){
    var value=e.target.value;
    console.log(value);
})

function preventBack() {
    window.history.forward(); //same as clicking forward in the browser
}
  
setTimeout("preventBack()", 0);
  
window.onunload = function () { null };//onunload occurs when the user navigates away from the page

// function disablePrev() { window.history.forward() }
// window.onload = disablePrev();
// window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
