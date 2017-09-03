var fs = require("fs");
const logFileName = "log.txt";
var outputstring = "";

// Hold the value of command "my-tweets",spotify-this-song", "movie-this", "do-what-it-says"
var commandType = process.argv[2];
// console.log("Command: " + commandType);
var commandSearch = process.argv[3];

if (commandType === "my-tweets") {
  var twitter = require('twitter');
  var loadTwitterKey = require("./keys.js");
  console.log("my-tweets");
  outputstring = commandType + '\n';
  var client = new twitter(loadTwitterKey);
  client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      var tweetTexts = [];      
      for (var i = 0; (i < tweets.length) && (i < 20); i++) {
        console.log('\t' + (i+1) + '. Created at: ' + tweets[i].created_at);
        outputstring += '\t' + (i+1) + '. Created at: ' + tweets[i].created_at + '\n';
        outputstring += '\t' + tweets[i].text + '\n';
        console.log("\t" + tweets[i].text);
        tweets[i].text += '\n';
        tweetTexts.push( tweets[i].text );
      }
      tweetTexts.push( '\n' );
      outputstring += '\n';
      writeLog(outputstring);
    }
    else {
      console.log(error);
    }
  });
  
}
else if (commandType === "spotify-this-song"){
  var spotify = require('node-spotify-api');
  var song = "";
  if (process.argv.length === 4){
    song = commandSearch;
  }
  else {
    song = 'The Sign by Ace of Base';
  }
  console.log("spotify-this-song " + song);
  outputstring = commandType + ' ' + song + '\n';
  var loadSpotifyKey = require("./spotifykeys.js");
  var client = new spotify(loadSpotifyKey);
  client.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      for (i=0; (i<data.tracks.items.length) && (i<20); i++) {
        console.log('\tSong Information Version Number: ' + (i+1));
        outputstring += '\tSong Information Version Number: ' + (i+1) + '\n';
        console.log("\tArtists: " + data.tracks.items[i].artists[0].name); 
        outputstring += '\tArtists: ' + data.tracks.items[i].artists[0].name + '\n'; 
        console.log("\tSong's Name: " + data.tracks.items[i].name);
        outputstring += "\tSong's Name: " + data.tracks.items[i].name + '\n';
        console.log("\tPreview Line: " + data.tracks.items[i].href);
        outputstring += '\tPreview Line: ' + data.tracks.items[i].href + '\n';
        console.log("\tAlbum: " + data.tracks.items[i].album.name);
        outputstring += '\tAlbum: ' + data.tracks.items[i].album.name + '\n';
      }  
    }
    writeLog(outputstring);
  });
}
else if (commandType === "movie-this") {
  console.log("movie-this");
  // var LoadSpotifyRandom = require("./random.txt");
}
else if (commandType === "do-what-it-says") {
  console.log("do-what-it-says");
  // var LoadSpotifyRandom = require("./random.txt");
}
else {
  console.log("Bad Command");
  writeLog("Bad Command\n\n");
}




function writeLog(stuff, file = logFileName) {
  fs.appendFile(file, stuff, isThereAnErrorThatIUnnecessarilyNeedToLog);
}

function isThereAnErrorThatIUnnecessarilyNeedToLog(err) {
  if (err) {
    console.error("There was problem writing to the file!", err);
  }
  //console.log("File saved!");
  return false; // !!!!
}