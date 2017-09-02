var fs = require("fs");
var twitter = require('twitter');
var loadTwitterKey = require("./keys.js");
var Spotify = require('node-spotify-api');
// var LoadSpotifyRandom = require("./random.txt");

const logFileName = "log.txt";
var outputstring = "";

// Hold the value of command "my-tweets",spotify-this-song", "movie-this", "do-what-it-says"
var commandType = process.argv[2];
// console.log("Command: " + commandType);

if (commandType === "my-tweets") {
  console.log("my-tweets");
  outputstring = commandType + '\n';
  var client = new twitter(loadTwitterKey);
  client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      // console.log(`JS TYPE: ${typeof tweets}, ARRAY LENGTH: ${tweets.length} --------------------------------------------------------------------------------TWEET JSON!!!!`);
      // Create an array of text strings that I'm going to get from the tweets
      // javascript object returned by the Twitter API
      var tweetTexts = [];      
      // Loop through the tweets javascript object which is an array as it happens
      for (var i = 0; i < tweets.length; i++) {
        // console.log(`Index of Element in \"tweets\" array #${i+1} : `);
        // Get the text property of each individual element of the tweets array 
        //console.log( "Text of Tweets: ");
        outputstring += '\t';
        outputstring += tweets[i].text;
        outputstring += '\n';
        console.log("\t" + tweets[i].text);
        tweets[i].text += '\n';
        tweetTexts.push( tweets[i].text );
      }
      tweetTexts.push( '\n' );
      writeLog(outputstring);
    }
    else {
      console.log(error);
    }
  });
  
}
else if (commandType === "spotify-this-song"){
  console.log("spotify-this-song");
}
else if (commandType === "movie-this") {
  console.log("movie-this");
}
else if (commandType === "do-what-it-says") {
  console.log("do-what-it-says");
}
else {
  console.log("Bad Command");
  writeLog(" Bad Command");
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