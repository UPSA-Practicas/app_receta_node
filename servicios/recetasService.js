const fs = require('fs')
const MongoLib = require('../lib/mongo')
class RecetasService{
    constructor() {
        this.coleccion = 'recetasFavoritas'
        this.mongoDB = new MongoLib()
    }

    async getRecetas() {
        try {
            return await this.mongoDB.getRecetasFavoritas(this.coleccion);
        } catch (error) {
            console.log('Error recuperando recetas')
        }
    }

    async addReceta(receta) {
        try {
            return await this.mongoDB.create(this.coleccion, receta);
        } catch (error) {
            console.log('Error añadiendo receta a favoritos');
            throw error;
        }
    }

    async deleteReceta(id) {
        try {
            return await this.mongoDB.delete(this.coleccion, id);
        } catch (error) {
            console.log('Error borrando receta de favoritos');
            throw error;
        }
    }

}

module.exports = RecetasService