import _ from 'lodash';
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
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('node js');
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return(
            <div>
                <SearchBar onTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        )
    }

    videoSearch(term) {
        YTSearch(API_KEY, {q: term})
            .then((result) => {
                this.setState({
                    videos: result.items,
                    selectedVideo: result.items[0]
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));