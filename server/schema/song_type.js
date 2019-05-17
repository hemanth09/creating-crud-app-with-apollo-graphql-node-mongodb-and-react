const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
  name:  'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./album_type'),
      resolve(parentValue) {
        return Song.findById(parentValue).populate('song')
          .then(song => {
            console.log(song)
            return song.song
          });
      }
    }
  })
});

module.exports = SongType;
