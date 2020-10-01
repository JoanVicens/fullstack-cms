const Curs = require('../models/curs');

function countAttended(musicId, list) {
    let counter = 0;

    if(list.length > 0) {
        list.forEach(element => {
            element.assistents.find(music => {
                return music._id == musicId
            }) ? counter++
            : ''
        });
    }


    return counter
}

exports.getAttendaceInformationFromMusicId =  async (musicId) => {

    const curs = await Curs.findOne({ curs_actiu: true })
    .populate({
        path: 'semestres.assajos',
        populate: {
            path: 'assistents',
            select: '_id'
        }

    })
    .populate({
        path: 'semestres.actuacions',
        populate: {
            path: 'assistents',
            select: '_id'
        }
    })

    if (curs) {
        const attendance = {}

        for (let i = 0; i < curs.semestres.length; i++) {
            let semestre = curs.semestres[i];

            attendance[i] = {
                rehersals: {
                    total: semestre.assajos.length,
                    attended: countAttended(musicId, semestre.assajos)
                },
                gigs: {
                    total: semestre.actuacions.length,
                    attended: countAttended(musicId, semestre.actuacions)
                }
            }
        }
        return attendance
    }
}

exports.getCurrentAcademicYearAssistance = async () => {
    return await await Curs.findOne({ curs_actiu: true })
        .populate({
            path: 'semestres.assajos',
            populate: {
                path: 'assistents',
                select: 'nom cognoms corda'
            }
        })
}

exports.addRehersalReference = async (rehersal) => {

    const curs = await Curs.findOneAndUpdate(
        { 'semestres.semestreId': rehersal.semestre},
        {
            $push: {
                "semestres.$.assajos": rehersal._id
            }
        }
        )
    
    return curs;
}

exports.removeRehersalReference = async (rehersalId) => {
    await Curs.findOneAndUpdate(
        { 'semestres.assajos': rehersalId},
        { 
            $pull: {
                'semestres.$.assajos': rehersalId
            }
        })    
}