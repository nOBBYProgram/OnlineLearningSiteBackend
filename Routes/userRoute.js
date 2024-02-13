const express = require('express')
const router = express.Router()
const {verifyToken,authorizeRoles, verifyUser} = require('../MiddleWares/verifyToken')
const { getAllUser, getUser, deleteUser } = require('../Controllers/userControl')

router.get('/find/all',verifyToken,authorizeRoles(['admin']),getAllUser)

router.get('/getuser/:id',verifyToken,getUser)
router.delete('/:id',verifyToken,verifyUser,deleteUser)

module.exports = router;