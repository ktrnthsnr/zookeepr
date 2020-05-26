// -- require Express.js
const express = require('express');
// -- connect to the JSON data -- //
const { animals } = require('./data/animals');

// -- instantiate an Express server
const app = express();

// -- functions -----  (place above ,get()) )



// - latest
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  // return the filtered results:
  return filteredResults;
}

    // // -- previous

    // function filterByQuery(query, animalsArray) {
    //   let filteredResults = animalsArray;
    //   if (query.diet) {
    //     filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    //   }
    //   if (query.species) {
    //     filteredResults = filteredResults.filter(animal => animal.species === query.species);
    //   }
    //   if (query.name) {
    //     filteredResults = filteredResults.filter(animal => animal.name === query.name);
    //   }
    //   return filteredResults;
    // }

// -- add a route (before listen) -- //

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);  // -- call the filterByQuery() in the app.get() callback
  }
  res.json(results);
});

    // //-- prev
    //     app.get('/api/animals', (req, res) => {
    //       let results = animals;
    //       console.log(req.query)    // -- add query
    //       res.json(results);
    //     });

    // // -- previous add route 
    //     app.get('/api/animals', (req, res) => {
    //         // -- quick test
    //             // res.send('Hello!');
    //         // -- respond with JSON data
    //         res.json(animals);
    //       });

// -- listen for requests, set the port, chain listen() method onto the server
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

// -- How to test and run step by step:
// -----------------------------------------
// -- 1. to start, run $ npm start
// -- successful response: (API server now on port 3001!) in the console.
// -- 2. after adding JSON route, start again
// -- successful response here: http://localhost:3001/api/animals 
