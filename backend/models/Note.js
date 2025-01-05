const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    history: [
      {
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        changes: Object
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);