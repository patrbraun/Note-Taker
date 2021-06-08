//look up uuid
const util = require('util')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//look up util.promisify
const readA = util.promisify(fs.readFile);
const writeA = util.promisify(fs.writeFile);

class Store {
    async getNotes() {
        console.log("Get notes");
        const notes = await readA('db/db.json', JSON.stringify());
        let result = [];
        try {
            result = JSON.parse(notes);
        }
        catch (err) {
            console.log("No notes found");
            result = [];
        }
        return result;

        // readA('db/db.json', JSON.stringify())
        // .then(notes => {
        //     console.log([].concat(JSON.parse(notes)));
        //     return [].concat(JSON.parse(notes));
        // })
        // .catch(err => {
        //     console.error(err);
        //     return [];
        // })
    }

    setNotes(note) {
        console.log("Set Notes");
        var title = note.title;
        var text = note.text;

        const createdNote = {
            title,
            text,
            id: uuidv4()
        };

        return this.getNotes()
            .then(notes => {
                writeA('db/db.json', JSON.stringify([...notes, createdNote]))
            });
    }

    deleteNotes(id) {
        console.log("Delete note");
        return this.getNotes()
            //gets notes array
            .then(notes => {

                //Find index of note with id parameter
                let index = -1;
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === id) {
                        index = i;
                    }
                }
                //removes selected note if found
                if (index > -1) {
                    notes.splice(index, 1);
                    //writes resulting array to database
                    writeA('db/db.json', JSON.stringify(notes));
                }
            });
    }
}

module.exports = new Store();