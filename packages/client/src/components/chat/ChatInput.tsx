import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import type { KeyboardEvent } from 'react';

import { Button } from '../ui/button';

export type ChatData = {
   prompt: string;
};

type ChatInputProps = {
   onSubmit: (data: ChatData) => void;
};

const ChatInput = ({ onSubmit }: ChatInputProps) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatData>();

   const handleFormSubmit = (data: ChatData) => {
      reset({ prompt: '' });
      onSubmit(data);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(handleFormSubmit)();
      } 
   };
   return (
      <form
         onSubmit={handleSubmit(handleFormSubmit)}
         onKeyDown={onKeyDown}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            autoFocus
            placeholder="Ask anything"
            className="w-full border-0 focus:outline-0 resize-none"
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
