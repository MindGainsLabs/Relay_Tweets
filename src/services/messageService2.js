import axios from 'axios';
import Message from '../models/Message.js';
import { sendToTelegram } from './telegramService.js';
import { formattedMessage } from '../utils/formatter.js';
import { configDotenv } from 'dotenv';
configDotenv();

const retrieveMessages = async (channelId, hours) => {
    const limit = 500;
    let before = null;
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    console.log('Cutoff Time UTC:', cutoffTime);

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

            for (const message of messages) {
                const messageTime = new Date(message.timestamp).toISOString();
                console.log('Message Time UTC:', messageTime);
            
                // Verifica se a mensagem já existe no banco
                const exists = await Message.exists({ id: message.id });
            
                if (!exists) {
                    console.log(`Nova mensagem encontrada: ${message.id}, salvando no banco e enviando ao Telegram.`);
            
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
            
                    // Envia para o Telegram, independentemente do intervalo de tempo
                    sendToTelegram(formattedMessage(message));
                }
            }
            before = messages[messages.length - 1].id; // Atualiza `before` para buscar mensagens mais antigas
        

        } catch (error) {
            console.error('Erro ao buscar mensagens:', error.response?.data || error.message);
        }

    // Buscar novamente do banco após inserção de novas mensagens
    const finalMessages = await Message.find({ createdAt: { $gte: cutoffTime } })
    .sort({ createdAt: -1 })
    .select('username description -_id'); // Seleciona apenas os campos desejados
    console.log('Número total de mensagens coletadas do banco:', finalMessages.length);
    
    return finalMessages;
};

export { retrieveMessages };
