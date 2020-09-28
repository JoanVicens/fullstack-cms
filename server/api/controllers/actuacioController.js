const Actuacio = require('../models/actuacio');

exports.addAttendant = async (id_actuacio, id_attendant) => {
    return Actuacio.findOneAndUpdate(
        { '_id': id_actuacio },
        {
            $push: {
                "assistents": id_attendant
            }
        }
    )
}

exports.removeAttendant = async (id_actuacio, id_attendant) => {
    const actuacio = await Actuacio.findOne( { '_id': id_actuacio } )

    if(actuacio) {
        let index = actuacio.assistents.indexOf(id_attendant)
        actuacio.assistents.splice(index, 1)
        return actuacio.save()
    }
}