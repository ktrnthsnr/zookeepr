// -- to refactor & add middleware, start an instance of 'Router'
    // -- cannot use app that is why adding Router() function

// -- require
const router = require("express").Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal, } = require("../../lib/animals");
const { animals } = require("../../data/animals");


// -- to refactor moved api/animal routes from server.js to here

    // -- GET requests
    /router.get("/animals", (req, res) => {
        let results = animals;
        if (req.query) {
          results = filterByQuery(req.query, results);
        }
        res.json(results);
      });
      
      router.get("/animals/:id", (req, res) => {
        const result = findById(req.params.id, animals);
        if (result) {
          res.json(result);
        } else {
          res.send(404);
        }
      });
      
    // -- POST
      router.post("/animals", (req, res) => {
        // set id based on what the next index of the array will be
        req.body.id = animals.length.toString();
      
        // if any data in req.body is incorrect, send 400 error back
        if (!validateAnimal(req.body)) {
          res.status(400).send("The animal is not properly formatted.");
        } else {
          const animal = createNewAnimal(req.body, animals);
          res.json(animal);
        }
      });
      

// -- export
module.exports  = router;

// //-- prev with /api/animals, will remove for above 
//       // -- GET requests
//       app.get('/api/animals', (req, res) => {
//         let results = animals;
//         if (req.query) {
//           results = filterByQuery(req.query, results);  // -- call the filterByQuery() in the app.get() callback
//         }
//         res.json(results);
//       });
      
//       app.get('/api/animals/:id', (req, res) => {
//         const result = findById(req.params.id, animals);
//         if (result) {
//           res.json(result);
//         } else {
//           res.send(404);
//         }
//       });
      
//       app.get('/animals', (req, res) => {
//         res.sendFile(path.join(__dirname, './public/animals.html'));
//       });