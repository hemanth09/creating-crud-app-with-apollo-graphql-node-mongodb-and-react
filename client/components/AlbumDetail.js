import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

//graph
import albumQuery from '../queries/fetchAlbum'
import SongCreate from './SongCreate'
import SongList from './SongList'

class AlbumDetail extends Component {
    render() {
        const { album } = this.props.data
        if(!album) {return null}

        return (
            <div>
                <Link to="/"> Back</Link>
                <h4>{album.title}</h4>
                <SongList songs={album.songs}/>
                <SongCreate albumId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default graphql(albumQuery, {
    options: (props) => { return { variables: { id: props.match.params.id }}}
})(AlbumDetail);
