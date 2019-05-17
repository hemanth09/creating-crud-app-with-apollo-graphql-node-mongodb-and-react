const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

SongSchema.statics.like = function(id) {
  const Song = mongoose.model('song');

  return Song.findById(id)
    .then(song => {
      ++song.likes;
      return song.save();
    })
}

mongoose.model('song', SongSchema);
