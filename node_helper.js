'use strict';

const NodeHelper = require('node_helper');
const SpotifyConnector = require('./core/SpotifyConnector');


module.exports = NodeHelper.create({

  start: function () {
    this.connector = undefined;
  },
  
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case 'CONNECT_TO_SPOTIFY':
        this.connector = new SpotifyConnector(payload);
        this.retrieveCurrentSong();
        break;

      case 'UPDATE_CURRENT_SONG':
        this.retrieveCurrentSong();
        break;
		    
      case 'PLAY_SPOTIFY':
		this.connector.playThis(payload).catch((error) => {
			console.error('Can’t start playing. Reason: ');
			console.error(error);
		});
        break;
		    
      case 'PLAY_NEXT':
        //todo
       break;
		    
      case 'PLAY_PREVIOUS':
        //todo
        break;
		    
      case 'PAUSE':
        //todo
        break;
		    
      case 'SHUFFLE':
        //todo
        break;
		    
      case 'REPEAT':
        //todo
        break;
		    
      case 'SEEK':
        //todo
        break;
		    
      case 'SET_VOLUME':
        //todo
        break;
    }
  },


  retrieveCurrentSong: function () {
    this.connector.retrieveCurrentlyPlaying()
      .then((response) => {
        if (response) {
          this.sendRetrievedNotification(response);
        } else {
          this.sendRetrievedNotification({ noSong: true });
        }
      })
      .catch((error) => {
        console.error('Can’t retrieve current song. Reason: ');
        console.error(error);
      });
  },


  sendRetrievedNotification: function (songInfo) {
    let payload = songInfo;

    if (!songInfo.noSong) {
      payload = {
        imgURL: this.getImgURL(songInfo.item.album.images),
        songTitle: songInfo.item.name,
        artist: this.getArtistName(songInfo.item.artists),
        album: songInfo.item.album.name,
        titleLength: songInfo.item.duration_ms,
        progress: songInfo.progress_ms,
        isPlaying: songInfo.isPlaying,
        deviceName: songInfo.device.name
      };
    }

    this.sendSocketNotification('RETRIEVED_SONG_DATA', payload);
  },


  getArtistName: function (artists) {
    return artists.map((artist) => {
      return artist.name;
    }).join(', ');
  },


  getImgURL(images) {
    let filtered = images.filter((image) => {
      return image.width >= 240 && image.width <= 350;
    });

    return filtered[0].url;
  }
});
