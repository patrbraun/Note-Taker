const router = require('express').Router();
const store = require('../db/store');

//create a route that responds with all notes coming from the data base
router.get('/notes', (req, res) => {
    console.log("router.get");
    store.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
    
    // return res.json([
    //     {
    //         "title":"Test Title",
    //         "text":"Test text"
    //     }
    // ]);
});

router.post('/notes', (req, res) => {
    console.log("router.post");
    store.setNotes(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
    console.log("router.delete");
    console.log("Note id: " + req.params.id);
    store.deleteNotes(req.params.id)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

module.exports = router;