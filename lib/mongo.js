const { MongoClient, ObjectId, } = require('mongodb')
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.d13xz.mongodb.net/`;

class MongoLib {
    async connect() {
        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI)
                console.log('Conectado a BBDD...')
                return MongoLib.connection.db(DB_NAME)
            } catch (e) {
                console.log('Error conectando a la BBDD')
                return e
            }
        }
    }

    async getRecetasFavoritas(collection) {
        try {
            let db = await this.connect()
            return await db.collection(collection).find().toArray();
        } catch (e) {
            return e;
        }
    }

    async create(collection, data) {
        const db = await this.connect();
        const result = await db.collection(collection).insertOne(data);
        return result.insertedId;
    }

    async delete(collection, id) {
        const db = await this.connect();
        const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    }
}

module.exports = MongoLib;