require('dotenv').config(); 
const express = require('express')
const app = express()

const port = process.env.PORT  || 8000

app.get('/test',(req,res) => {
   res.send('Test endpoint')
})

app.listen(port, () => {
   console.log('Server started! \n Listening on port ' + port)
}) 
