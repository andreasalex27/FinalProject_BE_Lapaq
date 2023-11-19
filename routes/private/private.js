const { getAllUsers, getDetailUser, deleteUser, editUser } = require('../../controller/userController')
const router = require('express').Router()

router.get('/api/users', getAllUsers)
router.get('/api/users/:_id', getDetailUser)
router.patch('/api/users/:_id', editUser)
router.delete('/api/users/:_id', deleteUser)

module.exports = router