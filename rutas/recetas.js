const express = require('express')
const RecetasService = require('../servicios/recetasService')

function recetasAPI(app){
    const router = express.Router()
    app.use('/api/recetas', router)

    const recetasService = new RecetasService()

    router.get('/', async function (req, res, next){
        try{
            const recetas = await recetasService.getRecetas()
            res.status(200).json(
                {
                    data: recetas,
                    message: 'Recetas favoritas recuperadas con éxito'
                }
            )
        } catch(err){
            console.log(`Se produjo un error ${err}`)
        }
    })

    router.post('/', async function (req, res, next) {
        try {
            const receta = req.body;
            const recetaId = await recetasService.addReceta(receta);
            res.status(201).json({
                data: recetaId,
                message: 'Receta añadida a favoritos'
            });
        } catch (err) {
            console.error(`Error añadiendo receta: ${err}`);
            res.status(500).json({ error: 'Error añadiendo receta' });
        }
    });

    router.delete('/:id', async function (req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await recetasService.deleteReceta(id);
            if (deleted) {
                res.status(200).json({
                    message: 'Receta eliminada de favoritos'
                });
            } else {
                res.status(404).json({ error: 'Receta no encontrada' });
            }
        } catch (err) {
            console.error(`Error eliminando receta: ${err}`);
            res.status(500).json({ error: 'Error eliminando receta' });
        }
    });
}

module.exports = recetasAPI