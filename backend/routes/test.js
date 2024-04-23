const express = require('express');
const router = express.Router();

//  server will always return a 200 OK response
router.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

module.exports = router;