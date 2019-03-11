'use strict';

Module.register('MMM-SpotifyControl', {

    // default values
    defaults: {
        // Module misc
        name: 'MMM-SpotifyControl',
        hidden: true,

        // user definable
       // updatesEvery: 1, // How often should the table be updated in s?
        //  showCoverArt: true,       // Do you want the cover art to be displayed?
        deviceName: null, // Set to Spotify device name to controll specific device.
    },


    start: function() {
        Log.info('Starting module: ' + this.name);

        this.initialized = false;
        this.context = {};

        this.startFetchingLoop();
    },

    getDom: function() {
        let domBuilder = new NPOS_DomBuilder(this.config, this.file(''));

        if (this.initialized) {
            return domBuilder.getDom(this.context);
        } else {
            return domBuilder.getInitDom(this.translate('LOADING'));
        }
    },

    //commenting here as I'm not sure it's necessary for controller 
    // getStyles: function () {
    //    return [
    //     this.file('css/styles.css'),
    //     this.file('node_modules/moment-duration-format/lib/moment-duration-format.js'),
    //     'font-awesome.css'
    //   ];
    // },

      getScripts: function () {
       return [
          this.file('core/NPOS_DomBuilder2.js'),
         'moment.js'
      ];
     },


    notificationReceived: function(notification, payload, sender) {
        //  console.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);

        switch (notification) {
            case 'PLAY_SPOTIFY':
                payload["deviceName"] = this.config.deviceName;
                this.sendSocketNotification('PLAY_SPOTIFY', payload);
                break;

            case 'PLAY_NEXT':
                payload["deviceName"] = this.config.deviceName;
                this.sendSocketNotification('PLAY_NEXT', payload);
                break;
            case 'PLAY_PREVIOUS':
                payload["deviceName"] = this.config.deviceName;
                this.sendSocketNotification('PLAY_PREVIOUS', payload);
                break;
            case 'PAUSE_SPOTIFY':
                //todo
                payload["deviceName"] = this.config.deviceName;
                this.sendSocketNotification('PAUSE_SPOTIFY', payload);
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
 startFetchingLoop() {
    // start immediately ...
    let credentials = {
      clientID: this.config.clientID,
      clientSecret: this.config.clientSecret,
      accessToken: this.config.accessToken,
      refreshToken: this.config.refreshToken
    };

    this.sendSocketNotification('CONNECT_TO_SPOTIFY', credentials);

    // ... and then repeat in the given interval
    setInterval(() => {
     this.sendSocketNotification('UPDATE_CURRENT_SONG');
    }, this.config.updatesEvery * 1000);
  }
});
