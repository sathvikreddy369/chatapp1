// const express = require('express');
// const router = express.Router();
// const { getMessages } = require('../controllers/messageController');
// const { protect } = require('../middleware/authMiddleware');

// // Protected route
// router.get('/:id', protect, getMessages);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;
