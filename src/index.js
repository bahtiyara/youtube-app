import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-v3-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
const API_KEY = 'AIzaSyA4iQq75FMNycOWrfYEFhGumk6kqXP6Rcs';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
        YTSearch(API_KEY, {q: 'node js'})
            .then((result) => {
                this.setState({videos: result.items});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return <div>
            <SearchBar />
            <VideoDetail video={this.state.videos[0]} />
            <VideoList videos={this.state.videos} />
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));