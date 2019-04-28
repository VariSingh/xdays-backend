const Day = require('../models/day.model');
const Challenge = require('../models/challenge.model');


// Retrieve and return all days of a challenge.
exports.findAll = (req, res, next) => {

    Challenge.findOne({ "_id": req.params.challengeId }, (error, result) => {
        if (!result) {
            res.status(200).send("Challenge not found");
        } else {
            const challengeDetails = result;
            Day.find({ "challenge": req.params.challengeId }, { __v: 0 }, { sort: { date: -1 } }, (error, result) => {
                const response = {
                    daysList: result,
                    challengeDetails: challengeDetails
                }
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(200).send(response);
                }

            })

        }
    })

};


// Save day of a challenge
exports.save = (req, res, next) => {



    Challenge.findOne({ '_id': req.params.challengeId }, (error, challenge) => {
        if (!challenge) {
            res.status(200).send("Challenge not found");
        } else {
            let d = new Date(req.body.date);
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            Day.findOne({ 'date': d }, (error, day) => {
                if (day) {
                    res.status(403).send({ message: 'Progress already added for this date.' });
                } else {
                    let data = {
                        'description': req.body.description,
                        'date': d,
                        'challenge': req.params.challengeId
                    }
                    day = new Day(data);
                    day.save(data, (error, day) => {
                        if (error) {
                            res.status(400).send(error);
                        } else {

                            Day.count({ 'challenge': req.params.challengeId }, (error, days) => {
                                if (!error) {
                                    console.log(days);
                                    console.log(challenge);
                                    challenge.completed_days = days;
                                    challenge.save((error,challenge)=>{
                                        if(error){
                                            res.status(400).send(error);
                                        }else{
                                            res.status(200).send(day);
                                        }    
                                    });
                                } else {
                                    res.status(400).send(error);
                                }

                            })



                        }
                    })
                }


            });

        }
    });





};

// findChallenge = async () =>{
//     return new Promise((resolve, reject) => {
//         //query if success then resolve(result)
//         //else reject with reject(error)
//         module.find().exec(error, result){
//         if(error){
//             reject(error);
//         }else{
//             resolve(result);
//         }
//         })
//     })
// }

// Update day
exports.update = (req, res, next) => {


    Day.findOneAndUpdate({ "_id": req.params.dayId }, { "description": req.body.description }, { new: true }, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(result);
        }

    })



};