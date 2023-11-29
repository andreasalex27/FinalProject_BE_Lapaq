const { getAllUsers, getDetailUser, deleteUser, editUser } = require('../../controller/UserController')
const authenticateToken = require('../../middleware/Auth')
const router = require('express').Router()

router.get('/api/users', [authenticateToken], getAllUsers)
router.get('/api/users/:_id', [authenticateToken], getDetailUser)
router.patch('/api/users/:_id', [authenticateToken], editUser)
router.delete('/api/users/:_id', [authenticateToken], deleteUser)

module.exports = router