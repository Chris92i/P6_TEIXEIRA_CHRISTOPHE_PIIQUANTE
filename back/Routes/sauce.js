const express = require('express')
const sauceCtrl = require('../controllers/sauces')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
// création du Router
const router = express.Router()


router.get('/', auth, sauceCtrl.getAllSauces);

router.get('/:id', auth, sauceCtrl.getOneSauce);

router.post('/', auth, multer, sauceCtrl.createSauce);
  
router.put('/:id', auth, sauceCtrl.upadeteSauce);

router.delete('/:id', auth, sauceCtrl.deleteSauce);

router.post("/:id/like",auth, sauceCtrl.likeSauce);
  
  
module.exports = router