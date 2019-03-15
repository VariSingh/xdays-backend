const Challenge = require('../models/challenge.model');


// Retrieve and return all Challenges from the database.
exports.findAll = (req, res, next) => {
    Challenge.find({},(error,result)=>{
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(result);
        }
        
    })
};


// Retrieve and return all Challenges from the database.
exports.save = (req, res, next) => {

    let data = {
        name:"Test Challenge",
        description:"Some test challenge",
        start_date:new Date(),
        number_of_days:15,
        status:"pending",
        penality:"I will try again"
    }

    Challenge.save(data,(error,result)=>{
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(result);
        }
        
    })
};