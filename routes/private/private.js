const { getAllUsers, getDetailUser, deleteUser } = require('../../controller/userController')
const router = require('express').Router()

router.get('/api/users', getAllUsers)
router.get('/api/users/:_id', getDetailUser)
router.patch('/api/users/:_id', (req, res)=>{
    res.send('masih dalam pengembangan')
})
router.delete('/api/users/:_id', deleteUser)

module.exports = router