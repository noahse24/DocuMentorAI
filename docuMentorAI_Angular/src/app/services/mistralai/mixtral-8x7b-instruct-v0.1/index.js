import Replicate from 'replicate'
import dotenv from 'dotenv'
dotenv.config()

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
})
const model = '{{MODEL}}'
const input = {
  prompt: "Write ten 5 letter words",
  max_new_tokens: 1024
};

const output = await replicate.run("mistralai/mixtral-8x7b-instruct-v0.1", { input });
console.log(output.join(""));

console.log({ model, input })
console.log('Running...')
//const output = await replicate.run(model, { input })
console.log('Done!', output)
