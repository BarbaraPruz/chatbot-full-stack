import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type ChatMessagesProps = {
   messages: Message[];
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const onCopyMessage = (e: React.ClipboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection && e.clipboardData) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };

   return (
      <>
         {messages.map((message, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               className={`px-3 py-1 max-w-lg rounded-xl prose ${
                  message.role === 'user'
                     ? 'bg-blue-600 text-white self-end'
                     : 'bg-gray-100 text-black self-start'
               }`}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
      </>
   );
};

export default ChatMessages;
