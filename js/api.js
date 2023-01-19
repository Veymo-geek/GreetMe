import axios from 'axios';

axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
  prompt: 'What is the meaning of life?',
  api_key: process.env.OPENAI_API_KEY,
})
  .then(function (response) {
    console.log(response.data.choices[0].text);
  })
  .catch(function (error) {
    console.log(error);
  });
