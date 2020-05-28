// -- required for adding new data in POSTs into the JSON file
const fs = require('fs');
const path = require('path');
// -- require Express.js
const express = require('express');
// -- connect to the JSON data -- //
const { animals } = require('./data/animals');

// -- instantiate an Express server
const app = express();

// -- parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// -- parse incoming JSON data
app.use(express.json());
// -- add middleware so the index.html can access the CSS and script.js
app.use(express.static('public'));


// -- Heroku requires port 80, set the environment variable process.env.PORT
const PORT = process.env.PORT || 3001;

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

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, './data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  return animal;
}

// -- validation 
function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}
// -- add a route (before listen) -- //

      // -- GET requests
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);  // -- call the filterByQuery() in the app.get() callback
  }
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


      // -- POST requests
app.post('/api/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  // if any data in req.body is incorrect, send 400 error back -- // adding validation
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});



// -- Listener, located at the end of the file; listens for requests; listen() method of the server or app object
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


      // -- prev POST requests
          // app.post('/api/animals', (req, res) => {
          //   // set id based on what the next index of the array will be
          //   req.body.id = animals.length.toString();
          //   // add animal to json file and animals array in this function
          //   const animal = createNewAnimal(req.body, animals);
          //   res.json(animal);
          // });
          
      // -- prev POST requests
          // app.post('/api/animals', (req, res) => {
          //   // req.body is where our incoming content will be
          //   console.log(req.body);
          //   res.json(req.body);
          // });


      // -- prev POST requests
          // app.post('/api/animals', (req, res) => {
          //   // set id based on what the next index of the array will be
          //   req.body.id = animals.length.toString()
          //   res.json(req.body);
          // });

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



// app.listen(3001, () => {
//     console.log(`API server now on port 3001!`);
//   });

// -- How to test and run step by step:
// -----------------------------------------
// -- 1. to start, run $ npm start
// -- successful response: (API server now on port 3001!) in the console.
// -- 2. after adding JSON route, start again
// -- successful response here: http://localhost:3001/api/animals 
// -- 3. test the filterByQuery method in the browser
// -- http://localhost:3001/api/animals?personalityTraits=hungry&personalityTraits=zany

