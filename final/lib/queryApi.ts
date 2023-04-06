import openai from "./openai";

type QueryProps = {
  prompt: string;
  chatId: string;
  model: string;
};

const query = async ({ prompt, chatId, model }: QueryProps) => {
  // TODO use the chatId to get previous messages from the database

  const res = await openai
    .createCompletion({
      model,
      prompt,
      max_tokens: 100,
      temperature: 0.9,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => `Unable to query ChatGPT: ${err}`);

  return res;
};

export default query;
