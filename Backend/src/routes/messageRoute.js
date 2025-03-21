const express = require('express');
const authmiddleware = require('../authmiddleware')

const router = express.Router();

router.route('/users').get(authmiddleware.protectAuthcontroller);
router.route('/:id').get(authmiddleware.protectAuthcontroller);
router.route('/send/:id').post(authmiddleware.protectAuthcontroller);




module.exports = router;