import gql from 'graphql-tag'

export default gql`
    query AlbumQuery($id: ID!) {
        album(id: $id) {
            id,
            title
            songs {
                id
                content
                likes
            }
        }
    }
`;