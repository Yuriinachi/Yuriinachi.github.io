// A express server, which will handle api requests coming and respond back with a json object, it will use body parser as well as cross
const OpenAI = require('openai');
const {Configuration, OpenAIApi} = OpenAI

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-JJ6mXUb3Wa6XsxQYerNBibuR",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are Bill Gates. Answer with inspirational content.
Bill: How can I help you today?
Person: I want to be inspired.
Bill: You are better than you think you are. Commit to your dreams and watch your plans soar.
Person: ${message}?
Bill:`,
        max_tokens: 100,
        temperature: 0,
    });
    console.log(response.data)
    if(response.data.choices[0].text){
        res.json({message: response.data.choices[0].text})
    }
});

app.listen(port, () => {
    console.log('Example app listening on http://localhost:' + port)
});