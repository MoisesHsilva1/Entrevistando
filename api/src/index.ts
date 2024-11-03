import express, { Express, Request, Response as ExpressResponse } from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose, { model } from "mongoose";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/chat"

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

mongoose.connect(uri)
    .then(() => console.log('connecting to mongodb'))
    .catch(err => console.error('error for connecting to Mongodb'))

const responseSchema = new mongoose.Schema({
    message: String,
    response: String
});

const ResponseMessage = mongoose.model('Response', responseSchema);

app.post('/chat', async (req: Request, res: ExpressResponse) => {
    const userMessage = req.body.message ? req.body.message.toLowerCase() : '';

    try {
        const responseDb = await ResponseMessage.findOne({ message: userMessage });

        if (responseDb) {
            console.log(`Resposta encontrada: ${responseDb.response}`);
            res.json({ response: responseDb.response });
        } else {
            res.json({ response: 'Desculpe, não entendi sua pergunta. Pode reformular?' });
        }
    } catch (error) {
        console.error('Error process request:', error);
        res.status(500).json({ response: 'Error internal server.' });
    }
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running in http://localhost:${port}`);
    });
} 
module.exports = app;