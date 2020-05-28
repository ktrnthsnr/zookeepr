// -- required for adding new data in POSTs into the JSON file
const fs = require('fs');
const path = require('path');
// -- require Express.js
const express = require('express');
// -- connect to the JSON data -- //
const { animals } = require('./data/animals');

// -- after refactoring, added new require imports
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// -- instantiate an Express server
const app = express();

// -- parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// -- parse incoming JSON data
app.use(express.json());

//-- added after refactoring, moving route directories
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// -- add middleware so the index.html can access the CSS and script.js
app.use(express.static('public'));


// -- Heroku requires port 80, set the environment variable process.env.PORT
const PORT = process.env.PORT || 3001;

// -- functions -----  (place above ,get()) )

        // -- moved to lib/animals.js to refactor

// -- add a route (before listen) -- //


// -- to refactor, moved to /routes/htmlRoutes 
    // api.get('/animals', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../../public/animals.html'));
    // });


    // api.get('/zookeepers', (req, res) => {
    //   res.sendFile(path.join(__dirname, './public/zookeepers.html'));
    // });

    // api.get('/', (req, res) => {
    //   res.sendFile(path.join(__dirname, './public/index.html'));
    // });


//       // -- POST requests -- refactored so moved to /routes/apiRoutes/animalRoutes.js
// app.post('/api/animals', (req, res) => {
//   // set id based on what the next index of the array will be
//   req.body.id = animals.length.toString();
//   // if any data in req.body is incorrect, send 400 error back -- // adding validation
//   if (!validateAnimal(req.body)) {
//     res.status(400).send('The animal is not properly formatted.');
//   } else {
//     const animal = createNewAnimal(req.body, animals);
//     res.json(animal);
//   }
// });



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

