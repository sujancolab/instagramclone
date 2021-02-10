const express = require('express');
const { signup, signin,requireSignin,profile } = require('../../controller/admin/user');
const router=express.Router();


router.post('/admin/signin',signin);
router.post('/admin/signup',signup);
router.post('/profile',requireSignin,profile);

module.exports=router;