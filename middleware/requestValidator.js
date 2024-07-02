// const { body } = require('express-validator/check');

// validate = (method) => {
//   switch (method) {
//     case 'register': {
//      return [ 
//         body('first_name','First Name does not exists').exists(),
//         body('last_name','Last Name doesn not exists').exists(),
//         body('email','Invalid email').exists().isEmail(),
//         body('password','Password does not exists').exists().min(5),
//         body('phone').exists().isInt(),
//         body('birthday').exists()
//        ]   
//     }
//   }
// }

// module.exports = {validate};