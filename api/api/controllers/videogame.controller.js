'use strict';
const _ = require('lodash');
const util = require('util');

const { Videogame } = require('../models');

function getVideogames(req, res) {
    Videogame.findAll()
    .then((videogames) => {
        res.status(200).send(videogames);
    }, (error) => {
        res.status(500).send(error);
    })
}

function getVideogameById(req, res) {
    var id = req.swagger.params.id.value;

    Videogame.findByPk(id)
    .then((videogame) => {
        if(!videogame)
            res.status(404).json("Not found");
        else
            res.status(200).send(videogame);
    }, (error) => {
        res.status(500).send(error);
    });
}

function createVideogame(req, res) {
    const payload = req.body;

    Videogame.create({
        name: payload.name,
        developer: payload.developer,
        gamesystem: payload.gamesystem,
        genre: payload.genre,
        year: payload.year,
        image: payload.image,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {}).then((videogame) => {
        res.status(201).send(videogame);
    }, (error) => {
        res.status(500).send(error);
    });
}

function updateVideogame(req, res) {
    const id = req.swagger.params.id.value;
    const payload = req.body;
    
    Videogame.findByPk(id)
    .then((videogame) => {
        if(!videogame)
            res.status(404).json("Not found");
        else
            return videogame.update({
                name: payload.name || videogame.name,
                developer: payload.developer || videogame.developer,
                gamesystem: payload.gamesystem || videogame.gamesystem,
                genre: payload.genre || videogame.genre,
                year: payload.year || videogame.year,
                image: payload.image || videogame.image,
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

function deleteVideogame(req, res) {
    const id = req.swagger.params.id.value;

    Videogame.findByPk(id).then((gameSystem) => {
        if(gameSystem) {
            Videogame.destroy({
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
    getVideogames,
    getVideogameById,
    createVideogame,
    updateVideogame,
    deleteVideogame
};