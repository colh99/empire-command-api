const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");


// Get a single planet's info by coordinates
const getPlanetByCoordinates = async (req, res) => {};


// Get a single planet's info by ID
const getPlanetById = async (req, res) => {};


// Create a new default planet at the given coordinates
const createPlanet = async (req, res) => {
  const galaxyId = new ObjectId(req.params.galaxyId);
  const givenSystemIndex = parseInt(req.params.systemIndex);
  const givenPlanetIndex = parseInt(req.params.planetIndex);
  // Construct the planet object
  const planet = {
    galaxyId: galaxyId,
    lastUpdated: new Date(),
    basicInfo: {
      owner: req.body.basicInfo.owner,
      planetName: req.body.basicInfo.planetName,
      coordinates: {
        systemIndex: givenSystemIndex,
        planetIndex: givenPlanetIndex,
      },
    },
    inboundMissions: [],
    outboundMissions: [],
    resources: req.body.resources,
    fleet: req.body.fleet,
    buildings: req.body.buildings,
  };
  // Add the planet object to the planets collection
  const result = await mongodb
    .getDb()
    .db("empire-command")
    .collection("planets")
    .insertOne(planet);

  if (result.acknowledged) {
    res.status(201).json(result.insertedId);
    // Update the galaxy to include a reference to the new planet at the planet's coordinates
    const updateResult = await mongodb
      .getDb()
      .db("empire-command")
      .collection("galaxies")
      .updateOne(
        { _id: galaxyId },
        {
          $set: {
            [`systems.${givenSystemIndex}.${givenPlanetIndex}`]: result.insertedId,
          }
        }
      );

    if (!updateResult.acknowledged) {
      res.status(500).json("Failed to update galaxy.");
    }
  } else {
    res.status(500).json("Failed to create planet.");
  }
};


// Rename a planet
const renamePlanet = async (req, res) => {};


// Construct a building on a planet
const constructBuilding = async (req, res) => {};


// Construct a ship on a planet
const constructShip = async (req, res) => {};


// Delete a planet
const deletePlanet = async (req, res) => {};


module.exports = {
  getPlanetByCoordinates,
  getPlanetById,
  createPlanet,
  renamePlanet,
  constructBuilding,
  constructShip,
  deletePlanet,
};
