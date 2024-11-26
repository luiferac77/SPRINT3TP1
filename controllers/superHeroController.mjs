//import SuperHero from "../models/SuperHero.mjs";
import { 
            obtenerSuperHeroePorId, 
            obtenerTodosLosSuperHeroes, 
            buscarHeroesPorAtributo, 
            obtenerSuperHeroesMayoresDe30, 
            nuevoSuperHero, 
            actualizarSuperHero, 
            eliminarSuperHero, 
            eliminarSuperHeroPorNombre
        } from "../services/superHeroService.mjs";

import { 
            renderizarSuperHeroe, 
            renderizarListaSuperHeroes, 
            renderizarMensajeDeOperacion 
        } from "../views/responseView.mjs";

//import { validationResult } from "express-validator";

export const obtenerSuperHeroePorIdController = async (req, res) => {

    const {id} = req.params;
    const superheroe = await obtenerSuperHeroePorId(id);

    if(superheroe){
        res.send(renderizarSuperHeroe(superheroe));
    } else {
        res.status(404).send({mensaje: "superheroe no encontrado"});
    }
}

export const obtenerTodosLosSuperHeroesController = async (req, res) => {
    const superheroes = await obtenerTodosLosSuperHeroes();
    if(superheroes){
        res.send(renderizarListaSuperHeroes(superheroes));
    } else {
        res.status(404).send({mensaje: "Superheroes no encontrados"});
    }
}

export const buscarHeroesPorAtributoController = async (req, res) => {
    //si quiero usar req.params la ruta en postman será por ejemplo
    //http://localhost:3000/api/heroes/buscar/nombreReal/Peter%20Parker

    //si quiero usar req.query la ruta de postman será por ejemplo 
    //http://localhost:3000/api/heroes/buscar?atributo=nombreReal&valor=Peter%20Parker

    const {atributo, valor} = req.params; //esto es para params
    //const {atributo, valor} = req.query; //esto es para query params
    const superheroes = await buscarHeroesPorAtributo(atributo, valor);

    if(superheroes.length > 0) {
        res.send(renderizarListaSuperHeroes(superheroes));
    } else {
        res.status(404).send({mensaje: "no se encontraron superheroes con ese atributo"});
    }
}

export const obtenerMayoresDe30Controller = async (req, res) => {
    const superheroes = await obtenerSuperHeroesMayoresDe30();
    if(superheroes){
        res.send(renderizarListaSuperHeroes(superheroes));
    } else {
        res.status(404).send({mensaje: "superheros no encontrados"});
    }
}

export const nuevoSuperHeroController = async (req, res) => {

    //const errors = validationResult(req);
    /*if(!errors.isEmpty()){
        return res.status(400).send({
            mensaje: "Error al validar los datos", 
            errores: errors.array()
        });
    }*/
    try {
        const datosSuperHero = req.body;
        const superHero = await nuevoSuperHero(datosSuperHero);
        if(superHero){
            res.send(renderizarSuperHeroe(superHero));
        } else {
            res.status(400).send({mensaje: "No se puedo insertar el superhéroe", error: error.message});    
        }
        
    } catch (error) {
        res.status(400).send({mensaje: "error al insetar el nuevo superhéroe", error: error.message});     
    }
}

export const actualizarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const superheroe = await actualizarSuperHero(id, datosActualizados);
    if(superheroe){
        res.send(renderizarSuperHeroe(superheroe));
    } else {
        res.status(404).send({mensaje: "error al actualizar el super heroe"});
    }
}

export const eliminarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    const superHeroe = await obtenerSuperHeroePorId(id);
    if(superHeroe){
        await eliminarSuperHero(id);
        res.send(renderizarMensajeDeOperacion("El superheroe ha sido eliminado", renderizarSuperHeroe(superHeroe)));
    } else {
        res.status(404).send(renderizarMensajeDeOperacion("Superheroe no encontrado"));
    }
}

export const eliminarSuperHeroPorNombreController = async (req, res) => {
    const { nombreReal } = req.params;
    console.log(nombreReal);
    const resultado = await eliminarSuperHeroPorNombre(nombreReal);
    if(resultado){
        res.send(renderizarMensajeDeOperacion("El superheroe ha sido eliminado", renderizarSuperHeroe(resultado)));
    } else {
        res.status(404).send(renderizarMensajeDeOperacion("Superheroe no encontrado"));
    }
}