"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/chat";
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
mongoose_1.default.connect(uri)
    .then(() => console.log('connecting to mongodb'))
    .catch(err => console.error('error for connecting to Mongodb'));
const responseSchema = new mongoose_1.default.Schema({
    message: String,
    response: String
});
const ResponseMessage = mongoose_1.default.model('Response', responseSchema);
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessage = req.body.message ? req.body.message.toLowerCase() : '';
    try {
        const responseDb = yield ResponseMessage.findOne({ message: userMessage });
        if (responseDb) {
            console.log(`Resposta encontrada: ${responseDb.response}`);
            res.json({ response: responseDb.response });
        }
        else {
            res.json({ response: 'Desculpe, não entendi sua pergunta. Pode reformular?' });
        }
    }
    catch (error) {
        console.error('Error process request:', error);
        res.status(500).json({ response: 'Error internal server.' });
    }
}));
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running in http://localhost:${port}`);
    });
}
module.exports = app;
