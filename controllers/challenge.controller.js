const Challenge = require('../models/challenge.model');
const Email = require('../utils/emails');







// Retrieve and return all Challenges from the database.
exports.findAll = (req, res, next) => {
    Challenge.find({}, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(result);
        }

    })
};


// Save challenge details in database
exports.save = (req, res, next) => {


    let data = {
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        number_of_days: req.body.number_of_days,
        status: req.body.status,
        penality: req.body.penality
    }

    challenge = new Challenge(data);

    challenge.save(data, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(result);
            Email.send(`New Challenge created. ${data.name}`);
        }

    })
};



// Delete challenge
exports.delete = (req, res, next) => {
    Challenge.remove({ _id: req.params.challengeId }, (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(result);
        }
    })
};






