const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'song'
  }]
});

AlbumSchema.statics.addSong = function(id, content) {
  const Song = mongoose.model('song');

  return this.findById(id)
    .then(album => {
      const song = new Song({ content, album })
      album.songs.push(song)
      return Promise.all([song.save(), album.save()])
        .then(([song, album]) => album);
    });
}

AlbumSchema.statics.findSongs = function(id) {
  return this.findById(id)
    .populate('songs')
    .then(album => album.songs);
}

mongoose.model('album', AlbumSchema);
