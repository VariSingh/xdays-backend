const Day = require('../models/day.model');
const Challenge = require('../models/challenge.model');


// Retrieve and return all days of a challenge.
exports.findAll = (req, res, next) => {

    Challenge.findOne({ "_id": req.params.challengeId }, (error, result) => {
        if (!result) {
            res.status(200).send("Challenge not found");
        } else {
                const challengeDetails = result;
            Day.find({ "challenge": req.params.challengeId },{__v:0},{sort:{date: -1}}, (error, result) => {
                const response = {
                    daysList:result,
                    challengeDetails:challengeDetails
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


    Challenge.findOne({ "_id": req.params.challengeId }, (error, result) => {
        if (!result) {
            res.status(200).send("Challenge not found");
        } else {
            let data = {
                'description': req.body.description,
                'date': req.body.date,
                'challenge': req.params.challengeId
            }
            day = new Day(data);

            day.save(data, (error, result) => {
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(200).send(result);
                }
            })
        }
    });





};



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