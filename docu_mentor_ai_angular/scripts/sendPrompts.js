const axios = require('axios');
require('dotenv').config(); // Ensure you have dotenv installed and a .env file with your API key

const apiToken = 'r8_76K3YtgIGAXI9MiI8HQUHLw3gzJqJ9Y1pZ8YK';

const url = 'https://api.replicate.com/v1/predictions';

const headers = {
    'Authorization': `Token ${apiToken}`,
    'Content-Type': 'application/json'
};

const data = {
    version: 'Mixtral-8x7B-instruct-v0.1',  // Replace with the model version you are using
    input: {
      prompt: "Write a poem",  // Your prompt to the language model
      // Include any other parameters that the API might require here
    }
};

axios.post(url, data, { headers: headers })
.then(response => {
    console.log('Response:', response.data);
})
.catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
});

//const promptText = 'Write a poem'; // Replace with the prompt you want to send
//sendPromptToLLM(promptText);
