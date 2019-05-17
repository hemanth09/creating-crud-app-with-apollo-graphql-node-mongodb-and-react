const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Album = mongoose.model('album');
const Song = mongoose.model('song');
const AlbumType = require('./album_type');
const SongType = require('./song_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAlbum: {
      type: AlbumType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Album({ title })).save()
      }
    },
    addSongToAlbum: {
      type: AlbumType,
      args: {
        content: { type: GraphQLString },
        albumId: { type: GraphQLID }
      },
      resolve(parentValue, { content, albumId }) {
        return Album.addSong(albumId, content);
      }
    },
    likeSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.like(id);
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Album.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
