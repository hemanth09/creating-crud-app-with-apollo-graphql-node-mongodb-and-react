import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { content } = this.state
        const { albumId } = this.props
        this.props.mutate({
            variables: {
                content, 
                albumId
            }
        }).then(() => this.setState({content: ''}))
    }
    render() {
        const { content } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add a song</label>
                <input 
                    value={content}
                    onChange={evt => this.setState({content: evt.target.value})}
                />
            </form>
        )
    }
}

const mutation = gql`
    mutation AddSong($content: String, $albumId: ID) {
        addSongToAlbum(content: $content, albumId: $albumId) {
            id
            songs {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(SongCreate);
