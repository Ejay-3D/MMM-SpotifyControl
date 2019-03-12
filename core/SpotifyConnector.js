'use strict';

const request = require('request-promise-native');
const moment = require('moment');
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
	
    if (moment().isBefore(this.tokenExpiresAt)) {
	  
	  let currentDeviceID = this.getDeviceID(payload.deviceName);
	  console.error("play on: "+currentDeviceID);
	  return this.PlaySpotify(currentDeviceID, uri);
	
    } else {
      return this.refreshAccessToken()
        .then((response) => {
          console.log('Refreshed access token because it has expired. Expired at: %s now is: %s',
            this.tokenExpiresAt.format('HH:mm:ss'), moment().format('HH:mm:ss'));

          this.credentials.accessToken = response.access_token;
          this.tokenExpiresAt = moment().add(response.expires_in, 'seconds');
		  let currentDeviceID = this.getDeviceID(payload.deviceName);
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
	if(deviceName != null){
		let options = {
			url: apiEndpoint + '/devices',   
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true,
			resolveWithFullResponse: true
		};
		
		request.get(options).then(function (response) {
			console.error(JSON.stringify(response));
			if (deviceName == jsonObject.name) return jsonObject.id;
		}).catch(function (err) {
			console.error(JSON.stringify(err));
			console.error(deviceName);
			return err;
		})
		
		
	} else {
		let options = {
			url: apiEndpoint,
			headers: {'Authorization': 'Bearer ' + this.credentials.accessToken},
			json: true,
			resolveWithFullResponse: true
		};
		
		request.put(options).then(function (response) {
			return jsonObject.id;
		}).catch(function (err) {
			return err;
		})
	}

    
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
