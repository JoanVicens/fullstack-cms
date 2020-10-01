const Assaig = require('../models/assaig');

const mongoose = require('mongoose')

exports.updateRehersalAttendans = async (rehersalId, updatedAttendants) => {
    const rehersal = await Assaig.findById(rehersalId);

    if(rehersal) {
        rehersal.assistents = updatedAttendants
        rehersal.ultima_modificacio = new Date();
        return await rehersal.save()
    } else {
        return new Error("No s'ha trobat el assaig")
    }
}

exports.addRehersal = async (rehersal, semesterId) => {
    const newRehersal = new Assaig({
        _id: new mongoose.Types.ObjectId(),
        data: rehersal.data,
        hora_inici: rehersal.hora_inici,
        hora_fi: rehersal.hora_fi,
        assistents: rehersal.assistents,
        lloc: rehersal.lloc,
        anotacio: rehersal.anotacio,
        semestre: semesterId
    })

    return await newRehersal.save();
}

exports.deleteRehearsal = async (rehersalId) => {
    const result = await Assaig.deleteOne({_id: rehersalId})

    return result.ok == 1
}

exports.updateRehersalData = async (rehersalId, updatedData) => {

    Assaig.findByIdAndUpdate(
        { '_id': rehersalId },
        {
            data: updatedData.data,
            hora_inici: updatedData.hora_inici,
            hora_fi: updatedData.hora_fi,
            assistents: updatedData.assistents,
            lloc: updatedData.lloc,
            anotacio: updatedData.anotacio,
            descripcio: updatedData.descripcio,
        })
        .then(() => {
            console.log('tot bé')
        })
        .catch(console.error)
}