const express= require('express');
const port= 3000;

const app= express();

app.listen(port, function(error){
    if(error){
        console.log(error);
        return;
    }

    console.log(`Server is running on port: ${port}`);
    return;
});