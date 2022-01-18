var create_account=document.getElementById("create-account");
var sign_in_form_div=document.getElementById("sign-in-form");
var manual_sign_in=document.getElementById("manual-sign-in");
var create_account=document.getElementById("create-account");
var trial=document.getElementById('trial');
console.log(manual_sign_in.style);
var rotate_form=0;
create_account.addEventListener('click',function(e){
    rotate_form+=180;
    sign_in_form_div.style.transform=`rotate3d(0,1,0,${rotate_form}deg)`;
    if((rotate_form/180)%2!=0){
        setTimeout(function(){
        manual_sign_in.style.display='none';
        // create_account.children[0].innerHTML='Sign-in'
        },600);
    }else{
        manual_sign_in.style.display='';
    }
});