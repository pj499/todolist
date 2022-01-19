var create_account=document.getElementById("create-account");
var sign_in_form_div=document.getElementById("sign-in-form");
var sign_up_form_div=document.getElementById("sign-up-form");

var manual_sign_in=document.getElementById("manual-sign-in");
var create_account=document.getElementById("create-account");

var sign_in_redirect= document.getElementById("sign-in-redirect");

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