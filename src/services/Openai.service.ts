import OpenAI from "openai";

let openai: OpenAI;

const init = () => {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

const generateDescription = async (movie: { name: string; year: number }) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Create a short description for the movie ${movie.name} released in ${movie.year} `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content ?? "";
};

export default { init, generateDescription };
