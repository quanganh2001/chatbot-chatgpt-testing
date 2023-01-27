# Create initialize
Using `npm init`. Press enter to default
```txt
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (api-tutorial)
version: (1.0.0)
description:                                                                                  
entry point: (index.js)                                                                       
test command:                                                                                 
git repository:                                                                               
keywords:                                                                                     
author:                                                                                       
license: (ISC)                                                                                
About to write to C:\Users\nhatn\OneDrive\Documents\Workspace\api-tutorial\package.json:

{
  "name": "api-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"


Is this OK? (yes)
```
# Install npm packages
Type `npm i openai express body-parser cors dotenv`
````txt
added 67 packages, and audited 68 packages in 10s

8 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
````
# Get API key OpenAI
Go to https://beta.openai.com/docs/quickstart/build-your-application and create new secret key.
# Source code
```js
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
```
# Testing
Type `node .`. It will notifications message: "Listening on port 3000".

Try using Postman