const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();

const token = process.env.API_TOKEN;
const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        max_tokens: 1024
    })

    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});