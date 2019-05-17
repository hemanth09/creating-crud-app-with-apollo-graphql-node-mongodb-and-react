const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const SongType = require('./song_type');
const Album = mongoose.model('album');

const AlbumType = new GraphQLObjectType({
  name:  'AlbumType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parentValue) {
        return Album.findSongs(parentValue.id);
      }
    }
  })
});

module.exports = AlbumType;
