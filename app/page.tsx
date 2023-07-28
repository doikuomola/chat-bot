'use client';

import { useChat } from 'ai/react';
import React, { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api',
  });

  const messageEndRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-neutral-800 min-h-screen">
      {messages.length !== 0 ? (
        <div className="p-32 pt-5 space-y-5 w-[75%] mx-auto relative">
          {messages.map((message) => (
            <div className="w-full" key={message.id}>
              {message.role === 'user' ? (
                <div className="flex  gap-x-2">
                  <div className="bg-gray-500 h-12 w-12 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-full h-full text-white p-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <p className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div className="flex gap-x-2">
                  <div className="bg-teal-500 h-12 w-12 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-full h-full text-white p-1"
                    >
                      <path d="M16.5 7.5h-9v9h9v-9z" />
                      <path
                        fillRule="evenodd"
                        d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <p className="rounded-lg p-3 w-full border-teal-500 border-2 text-sm">
                    {message.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center pt-32">
          <h1 className="font-bold text-xl md:text-3xl flex items-center gap-x-2">
            Please use the input field below
            <span className="animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M9.75 6.75h-3a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3h-3V1.5a.75.75 0 00-1.5 0v5.25zm0 0h1.5v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75z"
                  clipRule="evenodd"
                />
                <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
              </svg>
            </span>
          </h1>
        </div>
      )}

      <div ref={messageEndRef}></div>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-5 fixed bottom-0 left-0 w-full md:w-[75%] mx-auto right-0"
      >
        <div className="relative flex items-center">
          <TextareaAutosize
            tabIndex={0}
            required
            rows={1}
            value={input}
            onChange={handleInputChange}
            autoFocus
            spellCheck={false}
            className="w-full focus:outline-none shadow-teal-700 shadow-xl placeholder:text-gray-200 text-sm bg-neutral-600 text-white p-4 md:p-5 pr-16 rounded-xl"
          />
          <button
            type="submit"
            className="absolute bg-teal-500 hover:bg-teal-700 transition duration-200 ease-out p-2 rounded-lg right-0 mr-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
