import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  render() {
    const { videoId } = this.props;
    const opts = {
      height: '390',
      width: '800',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
      host: 'https://www.youtube.com',
    };

    return <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default VideoPlayer;
