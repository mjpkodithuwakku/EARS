const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res,next)=>{
   // res.send('<form action="/test/post-username" method="POST"> <input type="text" name="username">    <button type="submit"> Send </button> </form>');
   res.sendFile(path.join(__dirname, 'dashboard.html'));
});
router.get('/chart', (req, res, next)=>{
   console.log('data: ', req.body.username);
   res.sendFile(path.join(__dirname, 'chart.html'));
});
module.exports = router;