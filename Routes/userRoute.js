const express = require('express')
const router = express.Router()
const {verifyToken,authorizeRoles, verifyUser} = require('../MiddleWares/verifyToken')
const { getAllUser, getUser, deleteUser, updateUser } = require('../Controllers/userControl')

router.get('/find/all',verifyToken,authorizeRoles(['admin']),getAllUser)
router.put('/update/:id',updateUser)
router.get('/getuser/:id',getUser)
router.delete('/:id',verifyToken,verifyUser,deleteUser)

module.exports = router;