const express = require('express');
const authcontroller = require('../controllers/authcontroller')
const authmiddleware = require('../authmiddleware')

const router = express.Router();

router.route('/signup').post(authcontroller.signup);
router.route('/login').post(authcontroller.login);
router.route('/logout').post(authcontroller.logout);
router.route('/updateprofilepicture').put(authmiddleware.protectAuthcontroller,authcontroller.updateprofilepicture);
router.route('/check').get(authmiddleware.protectAuthcontroller , authcontroller.checkAuth);


module.exports = router;
