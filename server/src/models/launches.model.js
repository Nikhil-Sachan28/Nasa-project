const launches = new Map();

const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo")

let latestFlightNumber = 100;

const launch = {
    flightNumber : 100,
    mission : 'Kelper Exploration X',
    rocket : 'Explorer IS1',
    launchDate : new Date('december 27, 2030'),
    target : 'Kepler-442 b', //Kepler-442 b Kelper-442 b
    customer : ['ZTM' , 'NASA'],
    upcoming : true,
    success : true
};

saveLaunches(launch);
// launches.set(launch.flightNumber, launch);

async function getAllLaunches(){
    return await launchesDatabase.find({}, {
        '_id' : 0, '__v' : 0
    });
    //  Array.from(launches.values());
     
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber : latestFlightNumber,
        upcoming : true,
        success : true,
        customer : ['Zero to Mastery' , 'NASA'],
    }));

}

async function saveLaunches(launch){

    const planet = await planets.findOne({
        kepler_name : launch.target
    });

    if(!planet){
        throw new Error("No matching planet found");
    }
    await launchesDatabase.updateOne({
        flightNumber : launch.flightNumber
    },launch, {
        upsert : true
    });
}


function abortLaunchWithID(launchId){
    const aborted = launches.get(launchId);
    aborted.success = false;
    aborted.upcoming = false ;
    return aborted;
}

function existsLaunchWithID(launchId){
    return launches.has(launchId);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
    
}

