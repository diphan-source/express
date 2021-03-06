const {Router} = require('express');
const {auth  , isOwner} = require('../Middleware/jwt');
const {login , register} = require('../controllers/authController');
const {getAllUsers , getUserById , updateUserById , deleteUserById} = require('../controllers/userController');
//create a router instance
const router = Router();

router.get('/', (req, res) => {
    // console.log(req.headers);
    res.send('Hello World!');
});

//login route
router.post('/login', login);

//register route
router.post('/register', register);

//crud routes
router.get('/users',getAllUsers);
router.get('/users/:id',auth , isOwner,getUserById);
router.put('/users/:id',auth , isOwner ,updateUserById);
router.delete('/users/:id',auth , isOwner ,deleteUserById); 




module.exports = router;
