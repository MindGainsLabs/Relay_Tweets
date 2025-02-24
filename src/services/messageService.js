import axios from 'axios';
import Message from '../models/Message.js';
import { sendToTelegram } from './telegramService.js';
import { formattedMessage } from '../utils/formatter.js';
import { configDotenv } from 'dotenv';
configDotenv();

const retrieveMessages = async (channelId, hours) => {
    const limit = 100;
    let before = null;
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

    while (true) {
        let url = `https://discord.com/api/v10/channels/${channelId}/messages?limit=${limit}`;
        if (before) url += `&before=${before}`;

        const TOKEN = process.env.TOKEN_DISCORD || '';
        const headers = {
            'Authorization': `${TOKEN}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(url, { headers });
            const messages = response.data;

            if (messages.length === 0) {
                console.log('Nenhuma mensagem retornada.');
                break;
            }

            for (const message of messages) {
                const messageTime = new Date(message.timestamp).toISOString();
            
                const exists = await Message.exists({ id: message.id });
            
                if (!exists) {
                    const newMessage = new Message({
                        id: message.id,
                        username: message.author.username || 
                            message.embeds?.map(embed => embed.author?.name || 'Unknown').join(' ') || 
                            message.content || '',
                        description: message.embeds?.map(embed => embed.description).join(' ') || 
                            message.content || '',
                        createdAt: messageTime
                    });
            
                    await newMessage.save();
            
                    sendToTelegram(formattedMessage(message));
                }
            }
            before = messages[messages.length - 1].id;
            break
        

        } catch (error) {
            console.error('Erro ao buscar mensagens:', error.response?.data || error.message);
            break;
        }
    }

    const finalMessages = await Message.find({ createdAt: { $gte: cutoffTime } })
    .sort({ createdAt: -1 })
    .select('username description -_id');
    
    return finalMessages;
};

export { retrieveMessages };