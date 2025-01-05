const express = require('express');
const router = express.Router();

const noteController = require('../controllers/notesController');

router.post('/create', noteController.createNote);
router.get('/all', noteController.getAllNotes);
router.get('/shared', noteController.getSharedNotes);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/share', noteController.shareNote);

module.exports = router;