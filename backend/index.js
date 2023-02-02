 const express = require('express')
 const app = express()

 app.get('/',(req,res) => {
    res.send('Test endpoint')
 })

 app.listen(8080, () => {
    console.log('Server started')
 }) 
