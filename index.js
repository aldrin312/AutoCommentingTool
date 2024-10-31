#!/usr/bin/env node

import Groq from 'groq-sdk';
import fs from 'fs';
import { program } from 'commander';
import {} from 'dotenv/config';
import toml from 'toml';

// Function to get the chat completion from the LLM
export async function getGroqChatCompletion(data, api) {
  // Initialize the Groq API with the provided API key
  const groq = new Groq({ apiKey: api });
  // Create a new chat completion request with the LLM model and the user message
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content:
          'only output a file and add comments to this source code,' +
          'don\'t include ``` in your output, ' +
          'don\'t include \'Here is the output with comments\',' +
          ' no errors' +
          data,
      },
    ],
    model: 'llama3-8b-8192',
  });
}

// Function to read a file from the file system
export async function readFromFile(filename, outputfile, tokenUsage, apiKey) {
  return new Promise((resolve, reject) => {
    //gets the file extention from filename
    var extention = filename.split('.').pop();

    //check if the file extention is valid
    if (
      ![
        'ejs',
        'js',
        'ts',
        'cpp',
        'java',
        'c',
        'py',
        'cs',
        'php',
        'swift',
        'html',
        'htm',
      ].includes(extention)
    ) {
      return reject(new Error('Invalid file format.'));
    }

    // Read the file using the fs.readFile() method
    fs.readFile(filename, 'utf8', async (err, data) => {
      if (err) {
        return reject(err); //reject if file not found
      }

      try {
        const chatCompletion = await getGroqChatCompletion(data, apiKey);

        if (tokenUsage && chatCompletion.usage) {
          console.log(
            `Token usage: ${JSON.stringify(chatCompletion.usage, null, 2)}`,
          );
        }

        if (outputfile) {
          await writeIntoFile(
            chatCompletion.choices[0]?.message?.content || '',
            outputfile,
          );
        } else {
          console.log(chatCompletion.choices[0]?.message?.content || '');
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Function to write data to a file
async function writeIntoFile(data, fileName) {
  fs.writeFile('Outputs/' + fileName, data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });
}

// Define the CLI program
program
  .version('0.1')
  //.argument('<filename>...')
  .option('-s, --save <Name>', 'Put output in a file')
  .option('-t, --token-usage', 'Log token usage') // Added this line to handle token usage flag
  .option('-a, --api <apiKey>', 'Input api key')
  .description('Auto comment for a source file')
  .action(async (options) => {
    let configFile, config;
    if (fs.existsSync('./AutoCommentingTool-config.toml')) {
      //checks exists of file
      try {
        configFile = fs.readFileSync(
          './AutoCommentingTool-config.toml',
          'utf-8',
        );
        config = toml.parse(configFile);
      } catch (err) {
        console.error('Error found in toml file: ', err);
      }
    }

    var apiKey; //Setting up which api to use.
    //gets groq api key but will get overrided by
    apiKey = config?.api_key;
    const tokenUsage = options.tokenUsage ?? config?.tokenusage; // Get the value of the --token-usage flag
    const save = options.save ?? config?.save;
    if (options.api) {
      apiKey = options.api; //If user use --api
    } else {
      apiKey = process.env.GROQ_API_KEY;
    }

    for (const filename of program.args) {
      try {
        await readFromFile(filename, save, tokenUsage, apiKey); // Added await to ensure async completion
      } catch (error) {
        console.log(error.message);
      }
    }
  });
// Parse the command-line arguments
program.parse(process.argv);
