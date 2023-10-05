const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req, res){
    const launch = req.body;

    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target){
        res.status(400).json({
            error : "missing require launch property"
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        res.status(400).json({
            error : "Invalid Launch Date"
        });
    }
    addNewLaunch(launch);

    return res.status(201).json(launch);
}


function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);


    if(!existsLaunchWithID(launchId)){
        // if launch doesn't exits then
        return res.status(404).json({
            error : "launch doesn't exist"
        });
    }
    
    // if exists then
    const aborted = abortLaunchWithID(launchId);
    return res.status(200).json(aborted);
    
   
}

module.exports= {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,

}