var fs = require("fs");
var Twitter = require('twitter');


var LoadTwitterKey = require("./keys.js");

var Spotify = require('node-spotify-api');
// var LoadSpotifyRandom = require("./random.txt");


// Hold the value of command "my-tweets",spotify-this-song", "movie-this", "do-what-it-says"
var commandType = process.argv[2];
// console.log("Command: " + commandType);

if (commandType === "my-tweets") {
  console.log("my-tweets");
 
  //var client = new Twitter(LoadTwitterKey);
  
  var client = new Twitter({
    consumer_key: 'PLeYr4SUS9CAuBRGYCYHYyDK4',
    consumer_secret: 'i3Jz8Vci2mdNOS2VPUTNCmBJzJx6AnUddgb2nV0yeoyjXh570G',
    access_token_key: '903435559804305408-lABJQsWbsSEUBjnw7nl0INt2gxeOJrf',
    access_token_secret: 'Vq3ELWHRNrPTLzhe6RaUeJPkQTUbyvnijnMFKyPqFixOv'
  });
  
  
  client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      console.log("tweets: ");
      // console.log(tweets);
      // console.log(this.text);
      // console.log(response);
      // var printTweets = tweets.text;
         }
    else {
      console.log("Error: ");
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

}
else {
  console.log("bad command");
}


commandType = commandType + "\n";

// Callbacks appear in familiar places, like fs.writeFile.
fs.appendFile("log.txt", commandType, function(err) {

  if (err) {
    console.log(err);
  }

  console.log("File saved!");

});

// Alternatively, we can assign our function to a variable,
// and pass it by name.
// var writeFileCallback = function(err) {

//   if (err) {
//     console.log(err);
//   }

//   console.log("File saved!");

// };

// fs.writeFile("log.txt", "Log message!", writeFileCallback);