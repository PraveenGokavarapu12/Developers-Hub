const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getreviews,addreview } = require('../controllers/reviewsContoller');


router.use(verifyToken);

router.get('/:id', getreviews);
router.post('/:id', addreview);


module.exports = router;