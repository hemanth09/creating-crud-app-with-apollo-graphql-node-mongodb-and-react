import React, {Component} from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'

//graph
import query from '../queries/fetchAlbumsList'

class AlbumList extends Component {

    deleteAlbum(id) {
        this.props.mutate({
            variables: { id },
            refetchQueries: [{ query }]
        }).then(() =>  this.props.data.refetch())
    }
    renderAlbums() {
        const {albums} = this.props.data;
        return albums.map(({id, title}) => (
            <li key={id} className="collection-item">
                    <Link to={`/albums/${id}`}>
                        {title}
                    </Link>
                <i
                    className="material-icons"
                    onClick={() => this.deleteAlbum(id)}
                >
                    delete
                </i>
            </li>
        ));
    }
    render() {
        const {loading} = this.props.data;
        if(loading) { return <div>Loading....</div> }
        return (
            <div>
                <h3 className="headline">Album Store</h3>
                <ul className="collection">
                    {this.renderAlbums()}
                </ul>
                <Link to="/albums/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteAlbum($id: ID) {
        deleteAlbum(id: $id) {
            id
        }
    }
`;
export default compose(
    graphql(mutation),
    graphql(query))(AlbumList);
