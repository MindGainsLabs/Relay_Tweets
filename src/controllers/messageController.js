import { retrieveMessages } from '../services/messageService.js';
import Message from '../models/Message.js';
import { configDotenv } from 'dotenv';
configDotenv();

export const getMessages = async (req, res) => {
    const { hours } = req.body;
    const channelId = req.body.channelId || process.env.CHANNEL_ID;
    try {
        const messages = await retrieveMessages(channelId, hours);
        res.json({ message: 'Mensagens coletadas com sucesso.', data: messages });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao recuperar mensagens.', details: error.message });
    }
};

export const downloadMessages = async (req, res) => {
    try {
        const messages = await Message.find({})
            .sort({ createdAt: -1 })
            .select('username description');

        const data = messages.map(msg => `Username: ${msg.username}\nDescription: ${msg.description}\n`).join('\n');

        res.setHeader('Content-disposition', 'attachment; filename=messages.txt');
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao baixar mensagens.', details: error.message });
    }
};

export const getTotalMessages = async (req, res) => {
    try {
        const totalMessages = await Message.countDocuments({});
        res.json({ total: totalMessages });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o total de mensagens.', details: error.message });
    }
};