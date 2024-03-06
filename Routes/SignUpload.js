const express = require('express')
const { generateSignature } = require('../Controllers/SignUpload')

const router = express.Router()

router.post('/sign-upload',generateSignature)

module.exports =router