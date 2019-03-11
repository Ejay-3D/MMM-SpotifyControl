'use strict';

const NodeHelper = require('node_helper');
const SpotifyConnector = require('./core/SpotifyConnector');


module.exports = NodeHelper.create({

    start: function() {
        this.connector = undefined;
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case 'PLAY_SPOTIFY':
                this.connector = new SpotifyConnector(payload);
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
                this.connector.pauseThis(payload).catch((error) => {
                    console.log(payload);
                    console.error('Can’t pause player. Reason: ');
                    console.error(error);
                });

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


});
