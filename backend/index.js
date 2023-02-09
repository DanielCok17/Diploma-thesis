 const express = require('express')
 const app = express()

 app.get('/test',(req,res) => {
    res.send('Test endpoint')
 })

 app.listen( process.env.PORT  || 8080, () => {
    console.log('Server started! \n Listening on port ' + process.env.PORT  || 8080)
 }) 
