# MMM-SpotifyControl
A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project by [Michael Teeuw](https://github.com/MichMich) displaying the song currently playing on Spotify.

## Credits
To Be written 

## How it works
To Be written 



## Installing
Installing the module is quite straight forward. Getting it to display your playing songs requires a bit more work.

### Step 1 – Install the module

In your MagicMirror directory: 

```bash
cd modules
git clone https://github.com/ejay-ibm/MMM-SpotifyControl.git
cd MMM-SpotifyControl
npm install
```

### Step 2 – Create and authorize a Spotify app
In order to be able to connect to the Spotify API you need to create an app in the [Spotify developer area](https://beta.developer.spotify.com/dashboard/applications). Then you need to authorise the app to access your personal data. Et voilà!

The module provides you with a special app which describes all the necessary steps and which guides you through the whole process. To use this app change into the `authorization` folder and start the app by typing `node app`. 

```bash
cd authorization
node app
```

When the app is running you can access it by opening `localhost:8888` in your browser. Provided you are doing this directly on your Raspberry Pi. If you want to access the app remotely just type the ip address or the name of your Raspberry like so for instance: `http://raspi:8888`.

Now just follow the steps described there. After successful authorisation the app will display a code snippet under the heading 

**Step 3: Configure your mirror**. Copy that snippet and paste it into your mirror’s `config.js`. Configure the rest to your needs and you’re good to go.

** If you are using NowPlayingOnSpotify Module already I suggest to update your Tokens as well in this module so both module will use the same tokens. do not use NowPlayingOnSpotify tokens as they have lass permissions. 

Here is an example for an entry in `config.js`

```javascript
{
    module: "MMM-SpotifyControl",

    config: {
        clientID: "<YOUR_CLIENT_ID>",
        clientSecret: "<YOUR_CLIENT_SECRET>",
        accessToken: "<YOUR_ACCESS_TOKEN>",
        refreshToken: "<YOUR_REFRESH_TOKEN>",
        deviceName: "<DEVICENAME>"
    }
}
```
