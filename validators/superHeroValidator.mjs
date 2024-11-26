import { body } from "express-validator";

//Aquí voy a definir las reglas de validaciones para cada 
//conjunto de rutas o funcionalidades

export const validarSuperHeroe = [
    
    body('nombreSuperHeroe')
        .trim()
        .notEmpty().withMessage('El nombre del superheroes es requerido')
        .isLength({min: 3, max:60}).withMessage('El nombre del superheroe debe tener entre 3 y 60 caracteres'), 
    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real del superheroe es requerido')
        .isLength({min: 3, max: 60}).withMessage('El nombre real del superheroe de tener entre 3 y 60 caracteres'), 
    body('edad')
        .trim()
        .notEmpty().withMessage('La edad es un valor requerido')
        .isNumeric().withMessage('La edad debe ser un valor numérico')
        .custom((edad) => edad >= 0).withMessage('La edad debe ser un valor positivo'), 
    body('poderes')
        .isArray({min: 1}).withMessage('Poderes debe ser un array con al menos un elemento')
        .custom(
            (poderes) => {
                for(const poder of poderes){
                    if(typeof poder !== 'string' || poder.trim().length < 3 || poder.trim().length > 60){
                        throw new Error('Los poderes deben ser de tipo string entre 3 y 60 caracteres')
                    }
                }
                return true;
            }
        )
];
