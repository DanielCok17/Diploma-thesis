const express = require('express');
const router = express.Router();


// first route test
router.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = router;