const express = require('express');
const bodyPardse = require('body-parser');

const app = express();

app.use(bodyPardse.json());

//port goes from here

app.listen(3004, ()=>{
    console.log('server is runnning..')
})