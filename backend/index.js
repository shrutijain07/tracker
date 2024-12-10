const express = require('express') 
const app = express()

app.get('/list',(req,res)=>{
    res.json('hi')
})

app.listen(3000)