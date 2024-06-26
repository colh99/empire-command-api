const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');
const validate = require('../middleware/validate');

// Route to get a user's own game profile
router.get('/me', controller.getCurrentUser, (req, res) => {
    /*
    #swagger.summary = "Returns the logged in user's data including game profile."
    */
});

// Route to get a user by nickname
router.get('/:nickname', controller.getUserByNickname, (req, res) => {
    /*
    #swagger.summary = "Get a user's gameProfile by nickname."
    */
});

// Route to set a user's own nickname
router.put('/change-nickname', validate.setNickname, controller.setNickname, (req, res) => {
    /*
    #swagger.summary = "Set the current user's own nickname."
    #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            nickname: 'New Nickname',
        }
    }
    */
});

// Route to join a galaxy as the current logged in user
router.put('/join-galaxy', validate.joinGalaxy, controller.joinGalaxy, (req, res) => {
    /*
    #swagger.summary = "Join a galaxy as the current user."
    #swagger.parameters['obj'] = {
        description: 'Places a starting planet at the given coordinates.',
        in: 'body',
        schema: {
            galaxyId: 'Galaxy ID',
            coordinates: {
                systemIndex: 0,
                planetIndex: 0
            }
        }
    }
    */
});

// Route to delete a user's own account
router.delete('/delete-account', controller.deleteAccount, (req, res) => {
    /*
    #swagger.summary = "Delete the current user's account."
    */
});

module.exports = router;


