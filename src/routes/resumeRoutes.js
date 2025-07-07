const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resumeController = require('../controllers/resumeController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG and JPEG files are allowed'));
    }
  },
});

router.post('/', auth, upload.single('profilePicture'), resumeController.createResume);
router.get('/', auth, resumeController.getResumes);
router.get('/:id', auth, resumeController.getResume);
router.put('/:id', auth, upload.single('profilePicture'), resumeController.updateResume);
router.delete('/:id', auth, resumeController.deleteResume);

module.exports = router;