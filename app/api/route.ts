import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { prisma } from '../db';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      const data = await prisma.message.create({
        data: {
          answer: completion,
          question: messages.slice(-1)[0].content,
        },
      });
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
