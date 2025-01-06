const Note = require('../models/Note');
const User = require('../models/User');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content, ownerId: req.user.id });
    res.status(201).json({ data: note, message: 'Note created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ ownerId: req.user.id })
    .populate([
      { path: 'sharedWith', select: 'email name' },
      { path: 'history.updatedBy', select: 'email' },
    ]);
    res.status(200).json({ data: notes, message: 'Notes retrieved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSharedNotes = async (req, res) => {
  try {
    console.log(`Fetching shared notes for user: ${req.user.id}`);
    const notes = await Note.find({ sharedWith: req.user.id })
    .populate([
      { path: 'sharedWith', select: 'email name' },
      { path: 'history.updatedBy', select: 'email' },
      { path: 'ownerId', select: 'name' }
    ]);
    console.log(`Shared notes retrieved: ${notes.length}`);
    res.status(200).json({ data: notes, message: 'Notes retrieved successfully' });
  } catch (error) {
    console.error(`Error fetching shared notes: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    .populate([
      { path: 'sharedWith', select: 'email name' },
      { path: 'history.updatedBy', select: 'email' },
    ]);
    res.status(200).json({ data: note, message: 'Note retrieved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    const changes = {};

    if (req.body.title && req.body.title !== note.title) {
      changes.title = { from: note.title, to: req.body.title };
    }
    if (req.body.content && req.body.content !== note.content) {
      changes.content = { from: note.content, to: req.body.content };
    }

    Object.assign(note, req.body);
    note.history.push({
      updatedBy: req.user.id,
      changes
    });

    await note.save();

    // const io = req.app.get('io');
    // io.to(note._id.toString()).emit('note-updated', {
    //   noteId: note._id,
    //   changes,
    // });

    res.status(200).json({ data: note, message: 'Note updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({ data: note._id, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const { email } = req.body;
    const note = await Note.findById(req.params.id);
    const user = await User.findOne({ email });

    const requestingUser = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (requestingUser.email === email) {
      return res.status(400).json({ error: 'You cannot share a note with yourself' });
    }

    if (note.sharedWith.includes(user._id)) {
      return res.status(400).json({ error: 'User is already in the shared with list' });
    }

    note.sharedWith.push(user._id);
    await note.save();

    // Notify the shared user
    // const io = req.app.get('io');
    // io.to(user._id.toString()).emit('note-shared', {
    //   noteId: note._id,
    //   title: note.title,
    //   sharedBy: req.user.id,
    // });

    res.status(200).json({ data: note, message: 'Note shared successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
