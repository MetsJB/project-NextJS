'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export function Chat() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  console.log('messages', messages);

  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div className='bg-(--bg-primary) border border-(--border-color) rounded-xl p-6 mt-6 mb-20'>
      <h4 className='text-lg font-semibold text-(--text-primary) mb-4'>
        AI-ассистент
      </h4>

      <div className='space-y-3 mb-4 h-max overflow-y-auto'>
        {messages
          .filter((message) =>
            message.parts.some(
              (part) => part.type === 'text' && part.text.trim(),
            ),
          )
          .map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-(--bg-active) text-(--text-active) ml-8'
                  : 'bg-(--bg-secondary) text-(--text-primary) mr-8'
              }`}
            >
              {message.parts.map((part, i) =>
                part.type === 'text' ? (
                  <span key={i}>{part.text.replaceAll(/[*'`]/g, '')}</span>
                ) : null,
              )}
            </div>
          ))}
        {isLoading && (
          <div className='text-(--text-secondary) text-sm'>Думаю...</div>
        )}
        {error && (
          <div className='text-red-500 text-sm'>
            Что-то пошло не так, попробуй ещё раз
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            'message',
          ) as HTMLInputElement;
          if (input.value.trim()) {
            sendMessage({ text: input.value });
            input.value = '';
          }
        }}
        className='flex gap-2'
      >
        <input
          name='message'
          autoComplete='off'
          placeholder='Спроси что-нибудь...'
          className='flex-1 px-3 py-2 border border-(--border-color) rounded-lg bg-(--bg-primary) text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-(--accent)'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='px-4 py-2 bg-(--accent) text-(--text-active) rounded-lg hover:bg-(--accent-hover) transition disabled:opacity-50'
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
