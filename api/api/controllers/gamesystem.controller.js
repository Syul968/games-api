'use strict';
const _ = require('lodash');
const util = require('util');

const { GameSystem } = require('../models');

function getGameSystems(req, res) {
    GameSystem.findAll()
    .then((gamesystems) => {
        res.status(200).send(gamesystems);
    }, (error) => {
        res.status(500).send(error);
    })
}

function getGameSystemById(req, res) {
    var id = req.swagger.params.id.value;

    GameSystem.findByPk(id)
    .then((gamesystem) => {
        if(!gamesystem)
            res.status(404).json("Not found");
        else
            res.status(200).send(gamesystem);
    }, (error) => {
        res.status(500).send(error);
    });
}

function createGameSystem(req, res) {
    const payload = req.body;

    GameSystem.create({
        name: payload.name,
        description: payload.description,
        image: payload.image,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {}).then((gamesystem) => {
        res.status(201).send(gamesystem);
    }, (error) => {
        res.status(500).send(error);
    });
}

function updateGameSystem(req, res) {
    const id = req.swagger.params.id.value;
    const payload = req.body;
    
    GameSystem.findByPk(id)
    .then((gamesystem) => {
        if(!gamesystem)
            res.status(404).json("Not found");
        else
            return gamesystem.update({
                name: payload.name || gamesystem.name,
                description: payload.description || gamesystem.description,
                image: payload.image || gamesystem.image,
                updatedAt: new Date()
            })
            .then((updated) => {
                res.status(200).send(updated);
            }, (error) => {
                res.status(500).send(error);
            });
    }, (error) => {
        res.status(500).send(error);
    });
}

function deleteGameSystem(req, res) {
    const id = req.swagger.params.id.value;

    GameSystem.findByPk(id).then((gameSystem) => {
        if(gameSystem) {
            GameSystem.destroy({
                where: { id: id }
            }).then(() => {
                res.status(200).json("Deleted");
            });
        } else {
            console.log("IS NULL");
            res.status(404).json("Not found");
        }
    }, (error) => {
        res.status(500).send(error);
    });
}

module.exports = {
    getGameSystems,
    getGameSystemById,
    createGameSystem,
    updateGameSystem,
    deleteGameSystem
};