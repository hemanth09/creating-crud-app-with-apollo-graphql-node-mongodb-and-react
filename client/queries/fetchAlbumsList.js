import gql from 'graphql-tag'

export default gql`
    {
        albums {
            id
            title
        }
    }
`;