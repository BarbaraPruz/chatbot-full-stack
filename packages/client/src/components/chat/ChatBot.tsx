import { useRef, useState } from 'react';
import axios from 'axios';

import TypingIndicator from './TypingIndicator';
import ChatInput, { type ChatData } from './ChatInput';
import ChatMessages, { type Message } from './ChatMessages';

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const [error, setError] = useState('');
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);

   const onSubmit = async ({ prompt }: ChatData) => {
      try {
         setError('');
         setMessages((msgs) => [...msgs, { content: prompt, role: 'user' }]);
         setIsBotTyping(true);

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((msgs) => [
            ...msgs,
            { content: data.message, role: 'bot' },
         ]);
      } catch (err) {
         console.error({ err });
         setError('something went wrong');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}
            {error && <p className="text-red-500">{error}</p>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
