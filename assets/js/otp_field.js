var inputs=document.querySelectorAll('#otp > *[id]');
document.getElementById('first').focus();
function otpInputs(){
    for(let i=0;i<inputs.length;i++){
        inputs[i].addEventListener('keydown',function(e){
            if(e.key=='Backspace'){
                inputs[i].value='';
                if(i!=0)
                    inputs[i-1].focus();
            }else{

                if(i==inputs.length-1 && inputs[i].value!=''){
                    return true;
                }else if(e.keyCode>=48 && e.keyCode<=57){
                    inputs[i].value=e.key;
                    if(i!=inputs.length-1){
                        inputs[i+1].focus();
                    }
                    e.preventDefault();
                }else{
                    e.preventDefault();
                    return false;
                }
            }
        });
    }
}
otpInputs();