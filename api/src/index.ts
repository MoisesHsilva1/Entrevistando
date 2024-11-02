import express, { Express, Request, Response } from "express";
import cors = require("cors");
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/IA')
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

const responseSchema = new mongoose.Schema({
    message: { type: String, required: true },
    response: { type: String, required: true },
});

const ResponseModel = mongoose.model('Response', responseSchema); 


app.post('/IA', async (req: Request, res: Response) => {
    const userMessage = req.body.message ? req.body.message.toLowerCase() : '';

    try {
        const responseDB = await ResponseModel.findOne({ message: userMessage });

        if (responseDB) {
            console.log(`Resposta encontrada: ${responseDB.response}`);
            res.json({ response: responseDB.response });
        } else {
            console.log("Nenhuma resposta encontrada para a mensagem:", userMessage);
            res.status(404).json({ message: "Nenhuma resposta encontrada" });
        }
    } catch (err) {
        console.error("Erro ao buscar resposta:", err);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

app.get("/", (req: Request, res: Response) => {
    res.send("Servidor de mensagens em funcionamento");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
