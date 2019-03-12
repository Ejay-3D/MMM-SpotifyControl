'use strict';

const request = require('request-promise-native');
const moment = require('moment');
const fetch = require("node-fetch");
var replaceall = require("replaceall");


const tokenRefreshEndpoint = 'https:\/\/accounts.spotify.com/api/token';
const apiEndpoint = 'https:\/\/api.spotify.com/v1/me/player';


module.exports = class SpotifyConnector {

  constructor(credentials) {
    this.credentials = credentials;
    this.tokenExpiresAt = moment();
  }

 
  playThis(payload) {
	let url = payload.url;  
	let uri = replaceall("/", ":", url.replace("https:\/\/open.spotify.com", "spotify"));
	var currentDeviceID
    if (moment().isBefore(this.tokenExpiresAt)) {
	  
	  currentDeviceID = this.getDeviceID(payload.deviceName);
	  console.error("play on: "+currentDeviceID);
	  return this.PlaySpotify(currentDeviceID, uri);
	
    } else {
      return this.refreshAccessToken()
        .then((response) => {
          console.log('Refreshed access token because it has expired. Expired at: %s now is: %s',
            this.tokenExpiresAt.format('HH:mm:ss'), moment().format('HH:mm:ss'));

          this.credentials.accessToken = response.access_token;
          this.tokenExpiresAt = moment().add(response.expires_in, 'seconds');
		  currentDeviceID = this.getDeviceID(payload.deviceName);
		  return this.PlaySpotify(currentDeviceID, uri);
        })
        .catch((err) => {
          console.error('Error while refreshing:');
          console.error(err);
	      console.error(payload.deviceName);
	      console.error(currentDeviceID);
        });
    }
  }

  getSpotifyData() {
    let options = {
      url: apiEndpoint,
      headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
      json: true
    };

    return request.get(options);
  }
  
	
PauseSpotify(currentDeviceID) {
	  if (moment().isBefore(this.tokenExpiresAt)) {

	let options = {
			url: apiEndpoint + '/pause',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.put(options);
	console.log(request.put(options));
		     }
	else {
      return this.refreshAccessToken()
        .then((response) => {
          console.log('Refreshed access token because it has expired. Expired at: %s now is: %s',
            this.tokenExpiresAt.format('HH:mm:ss'), moment().format('HH:mm:ss'));

          this.credentials.accessToken = response.access_token;
          this.tokenExpiresAt = moment().add(response.expires_in, 'seconds');
		let options = {
			url: apiEndpoint + '/pause',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.put(options);
	console.log(request.put(options));
        })
		.catch((err) => {
          console.error('Error while refreshing:');
          console.error(err);
        });
	}	
}
	
ResumeSpotify(currentDeviceID) {
	  if (moment().isBefore(this.tokenExpiresAt)) {

	let options = {
			url: apiEndpoint + '/play',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.put(options);
	console.log(request.put(options));
		     }
	else {
      return this.refreshAccessToken()
        .then((response) => {
          console.log('Refreshed access token because it has expired. Expired at: %s now is: %s',
            this.tokenExpiresAt.format('HH:mm:ss'), moment().format('HH:mm:ss'));

          this.credentials.accessToken = response.access_token;
          this.tokenExpiresAt = moment().add(response.expires_in, 'seconds');
		let options = {
			url: apiEndpoint + '/play',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.put(options);
	console.log(request.put(options));
        })
		.catch((err) => {
          console.error('Error while refreshing:');
          console.error(err);
        });
	}	
}
  
	
NextSpotify(currentDeviceID) {
	  if (moment().isBefore(this.tokenExpiresAt)) {
 
	let options = {
			url: apiEndpoint + '/next',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.post(options);
	console.log(request.post(options));
		     }
	else {
      return this.refreshAccessToken()
        .then((response) => {
          console.log('Refreshed access token because it has expired. Expired at: %s now is: %s',
            this.tokenExpiresAt.format('HH:mm:ss'), moment().format('HH:mm:ss'));

          this.credentials.accessToken = response.access_token;
          this.tokenExpiresAt = moment().add(response.expires_in, 'seconds');
		let options = {
			url: apiEndpoint + '/next',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.post(options);
	console.log(request.post(options));
        })
		.catch((err) => {
          console.error('Error while refreshing:');
          console.error(err);
        });
	}	
}
	
PreviousSpotify(currentDeviceID) {
	  if (moment().isBefore(this.tokenExpiresAt)) {
 
	
	let options = {
			url: apiEndpoint + '/previous',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.post(options);
	console.log(request.post(options));
		     }
	else {
      return this.refreshAccessToken()
        .then((response) => {
          console.log('Refreshed access token because it has expired. Expired at: %s now is: %s',
            this.tokenExpiresAt.format('HH:mm:ss'), moment().format('HH:mm:ss'));

          this.credentials.accessToken = response.access_token;
          this.tokenExpiresAt = moment().add(response.expires_in, 'seconds');
		let options = {
			url: apiEndpoint + '/previous',    
			//qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.post(options);
	console.log(request.post(options));
        })
		.catch((err) => {
          console.error('Error while refreshing:');
          console.error(err);
        });
	}	
}	
	
	
 PlaySpotify(currentDeviceID, uri) {
    
	if(uri.indexOf('track')> -1){
		let options = {
			url: apiEndpoint + '/play',    
			body: {
              "uris": [uri],
              "position_ms": 0
            },
			qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.put(options);
	} else {
		let options = {
			//url: apiEndpoint + '/play?device_id=' + currentDeviceID, 
			url: apiEndpoint + '/play', 			
			body: {
              "context_uri": uri,
              "position_ms": 0
            },
			qs: {device_id: currentDeviceID},
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true
		};
		return request.put(options);	
	}

    
  }
  
  getDeviceID(deviceName) {
  var options = {
   // url: apiEndpoint + '/devices',
    headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
    json: true,
    resolveWithFullResponse: true
  }
   
   async function request()  	{
   const response = await fetch('https://api.spotify.com/v1/me/player/devices',options);
   const result = await response.json(); 
   let mydevices = await result.devices
	   console.error('we are here my devices id is :');
	console.error(mydevices[0].id);
	   var i
	
    for ( i = 0; i < mydevices.length; i++) {
	 var device = await mydevices[i]
      
      if (device.name == deviceName) var foundId = await device.id;
	    console.error('after if :'+foundId)
	   
    }
		 return foundId;
	   
}
  const myID = request();	
	  result.then(foundId => console.error(foundId));
	  
}
  

  refreshAccessToken() {
    let client_id = this.credentials.clientID;
    let client_secret = this.credentials.clientSecret;
    let options = {
      url: tokenRefreshEndpoint,
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: this.credentials.refreshToken
      },
      json: true
    };

    return request.post(options);
  }
};
