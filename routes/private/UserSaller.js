const { getAllUsers, getDetailUser, updateUser, deleteUser } = require('../../controller/UserSallerController')

const router = require('express').Router()

router.get('/users/seller', getAllUsers)
router.get('/users/seller/:_id', getDetailUser)
router.patch('/users/seller/:_id', updateUser)
router.delete('/users/seller/:_id', deleteUser)

module.exports = router