const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const calendari = require("../services/calendari");

const assaigController = require('../controllers/assaigController');
const cursController = require('../controllers/cursController');

async function addRehersal(rehersal, semestreId) { // adds the rehersal and push its ID to the acadamic year
    try {
        let result = await assaigController.addRehersal(rehersal, semestreId)

        //calendari.guardarEvent(result, result._id)

        return cursController.addRehersalReference(result) // returns a promise
    } catch (err) { return err }
}


router.post('/list', middlewares.musicAutoritzat, async (req, res) => { // List all rehersals of the current academic year
    
    const list = {}
    
    if(req.body.curentYear) {
        const academicYear = await cursController.getCurrentAcademicYearAssistance();
        
        academicYear.semestres.forEach(semestre => {
            list[semestre.numero] = {
                assajos: semestre.assajos
            }
        });

        res.status(200).json(list)
    } else {
        // TODO: return the list of all academic years
        res.sendStatus(400)
    }
})


router.put('/:id/assistencia', async (req, res) => { // Uptades the attendance of a rehersal
    
    const attendants = req.body.assistents;

    if (attendants != undefined) {
        const result = await assaigController.updateRehersalAttendans(req.params.id, attendants)

        if(result instanceof Error) {
            res.status(500).json({ message: result.message })
        } else {
            res.status(200).json({ message: 'Assistència actualitzada correctament'})
        }
    }
})


router.post('/:id', async (req, res) => { // Updates the rehersal info
    const rehersalId = req.params.id;
    const updatedData = req.body.data

    assaigController.updateRehersalData(rehersalId, updatedData)    
})


router.delete('/:id', async (req, res) => { // Deletes a rehersal
    const rehersalId = req.params.id;
    try {

        const succes = assaigController.deleteRehearsal(rehersalId);
    
        if(succes) {
            await cursController.removeRehersalReference(rehersalId)
            res.status(200).json( {message: "Assaig eliminat correctament"})
        }
    } catch (err) {
        res.status(500).json({err})
    }
})


router.put('/', async (req, res) => { // Add one or several rehersals
    
    const rehersals = req.body.rehersals
    const semestreId = req.body.semestreId

    if (!rehersals || !semestreId) {
        res.status(400).json({ message: 'Falta informació' })
    }

    const promises = [];

    if (rehersals instanceof Array) {
        rehersals.forEach(rehersal => {
            promises.push(addRehersal(rehersal, semestreId))
        })
    } else {
        promises.push(addRehersal(rehersals, semestreId))
    }

    Promise.all(promises)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.status(500).json(err)
        })


})


module.exports = router;