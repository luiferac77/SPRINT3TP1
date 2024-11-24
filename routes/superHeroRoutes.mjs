import express from 'express';
import { 
            obtenerSuperHeroePorIdController, 
            obtenerTodosLosSuperHeroesController, 
            buscarHeroesPorAtributoController,
            obtenerMayoresDe30Controller, 
            nuevoSuperHeroController, 
            actualizarSuperHeroController, 
            eliminarSuperHeroController, 
            eliminarSuperHeroPorNombreController
        } from '../controllers/superHeroController.mjs';

const router = express.Router();

//Orden de las rutas:
//Las más especificas, que son las que pueden contener parámetros deben ir primeras
//por último las de edición, que también están ordenadas 
//desde las más especificas a las más generales

//Rutas más especficas
router.get('/heroes/mayores-30', obtenerMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarHeroesPorAtributoController); //cuando uso req.params
//router.get('/heroes/buscar', buscarHeroesPorAtributoController);// cuando uso req.query;
router.get('/heroes/:id', obtenerSuperHeroePorIdController);

//ruta general
router.get('/heroes', obtenerTodosLosSuperHeroesController);


//rutas de edición
router.post('/heroes/nuevo', nuevoSuperHeroController);
router.put('/heroes/actualizar/:id', actualizarSuperHeroController);
router.delete('/heroes/eliminar/:id', eliminarSuperHeroController);
router.delete('/heroes/eliminarpornombre/:nombreReal', eliminarSuperHeroPorNombreController);

export default router;