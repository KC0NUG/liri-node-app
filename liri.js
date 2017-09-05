var fs = require("fs");
const logFileName = "log.txt";
var outputstring = "";
var doCommand = false;


// Hold the value of command "my-tweets",spotify-this-song", "movie-this", "do-what-it-says"
var commandType = process.argv[2];
var commandSearch = process.argv[3];

if (commandType === "my-tweets") {
  doMyTweets();  
}
else if (commandType === "spotify-this-song") {
  doSpotifyThisSong(doCommand);  
}
else if (commandType === "movie-this") {
  doMovieThis();  
}  
else if (commandType === "do-what-it-says") {
  doDoWhatItSays();
}
else {
  console.log("Bad Command");
  writeLog("Bad Command\n\n");
}


function doMyTweets() {
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


function doSpotifyThisSong(doCommand){
  var spotify = require('node-spotify-api');
  var song = "";
  if (process.argv.length === 4){
    song = commandSearch;
  }
  else {
    song = 'The Sign by Ace of Base';
  }
  if (doCommand) {
    song = commandSearch;
  }
  var loadSpotifyKey = require("./spotifykeys.js");
  var client = new spotify(loadSpotifyKey);
  client.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);      
    } else {
      if (data.tracks.items.length!==0){
        console.log("spotify-this-song " + song);
        outputstring = commandType + ' ' + song + '\n';
        for (i=0; (i<data.tracks.items.length) && (i<20); i++) {
          console.log('\tSong Information Version Number: ' + (i+1));
          outputstring += '\tSong Information Version Number: ' + (i+1) + '\n';
          console.log("\tArtists: " + data.tracks.items[i].artists[0].name); 
           outputstring += '\tArtists: ' + data.tracks.items[i].artists[0].name + '\n'; 
          console.log("\tSong's Name: " + data.tracks.items[i].name);
          outputstring += "\tSong's Name: " + data.tracks.items[i].name + '\n';
          console.log("\tPreview Link: " + data.tracks.items[i].href);
          outputstring += '\tPreview Link: ' + data.tracks.items[i].href + '\n';
          console.log("\tAlbum: " + data.tracks.items[i].album.name);
          outputstring += '\tAlbum: ' + data.tracks.items[i].album.name + '\n';
        } 
      }
      else {
        outputstring = commandType + ' ' + song;
        outputstring += " Song Not Found!";
        console.log(outputstring);  
      }  
    }    
    outputstring += '\n\n';
    writeLog(outputstring);
  });
}



function doMovieThis(doCommand){
  var request = require('request');
  function queryUrl(title) {
  return "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
  }
  var movieName = "";
  if (process.argv.length === 4){
    movieName = commandSearch;
  }
  else {
    movieName = 'Mr. Nobody';
  }
  if (doCommand){
    movieName = commandSearch; 
  }
  request(queryUrl(movieName), function(err, res, body) {
    if (err) return console.error(err);
    if (JSON.parse(body).Response === "True") {
      console.log("movie-this " + movieName);
      outputstring = commandType + ' ' + movieName + '\n';      
      console.log("\tTitle: " + JSON.parse(body).Title);
      outputstring += '\tTitle: ' + JSON.parse(body).Title + '\n';
      console.log("\tYear: " + JSON.parse(body).Year);
      outputstring += '\tYear: ' + JSON.parse(body).Year + '\n';
      console.log("\tIMDB Rating: " + JSON.parse(body).imdbRating);
      outputstring += '\tIMDB Rating: ' + JSON.parse(body).imdbRating + '\n';

      //  if rotten tomatoes rating the print
      var RottenTomatoes = 'Rotten Tomatoes';
      var foundRottenTomatoes = false;
      for (b=0; b< JSON.parse(body).Ratings.length; b++){
        if (RottenTomatoes === JSON.parse(body).Ratings[b].Source){        
          foundRottenTomatoes = true;
          console.log("\tRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          outputstring += '\tRotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value + '\n';
        } 
      }
      if (!foundRottenTomatoes){
        console.log("\tRotten Tomatoes Rating: Not Available");
        outputstring += '\tRotten Tomatoes Rating: Not Available\n';
      }
      console.log("\tCountry: " + JSON.parse(body).Country);
      outputstring += '\tCountry: ' + JSON.parse(body).Country + '\n';
      console.log("\tLanguage: " + JSON.parse(body).Language);
      outputstring += '\tLanguage: ' + JSON.parse(body).Language + '\n';
      console.log("\tPlot: " + JSON.parse(body).Plot);
      outputstring += '\tPlot: ' + JSON.parse(body).Plot + '\n';
      console.log("\tActors: " + JSON.parse(body).Actors);
      outputstring += '\tActors: ' + JSON.parse(body).Actors + '\n\n';
      writeLog(outputstring);
    } else {
      console.log("movie-this " + movieName + " was not found!");
      outputstring = commandType + ' ' + movieName + ' was not found!\n\n';  
      writeLog(outputstring);  
    }
  });
}


function doDoWhatItSays(){
  console.log("do-what-it-says");
  writeLog("do-what-it-says\n");  
  fs.readFile('./random.txt','utf8', (err, data_in) => {
    if (err) throw err;    
    var res = data_in.split(",");   
    commandType = res[0];
    commandSearch = res[1];    
    if (commandType === "my-tweets") {
      doMyTweets();  
    }
    else if (commandType === "spotify-this-song") {
      doCommand = true;
      doSpotifyThisSong(doCommand);  
    }
    else if (commandType === "movie-this") {
      doCommand = true;
      doMovieThis(doCommand);  
    }  
    else {
      console.log("Bad Command");
      writeLog("Bad Command\n\n");
    }
  });
}


function writeLog(stuff, file = logFileName) {
  fs.appendFile(file, stuff, isThereAnErrorThatIUnnecessarilyNeedToLog);
}

function isThereAnErrorThatIUnnecessarilyNeedToLog(err) {
  if (err) {
    console.error("There was problem writing to the file!", err);
  }  
  return false; // !!!!
}
