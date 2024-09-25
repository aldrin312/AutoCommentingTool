#!/usr/bin/env node

import Groq from "groq-sdk";
import fs from "fs";
import { program } from "commander";
import {} from 'dotenv/config'

// Initialize the Groq API with the provided API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to get the chat completion from the LLM
export async function getGroqChatCompletion(data) {
    // Create a new chat completion request with the LLM model and the user message
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "only output a file and add comments to this source code," +
        "don't include ``` in your output, " +
        "don't include 'Here is the output with comments',"+
        " no errors" + data,
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Function to read a file from the file system
export async function readFromFile(filename, outputfile, tokenUsage) {

  return new Promise((resolve, reject) => {
    //gets the file extention from filename
    var extention = filename.split('.').pop();

    //check if the file extention is valid
    if (extention.search("js|ts|cpp|java|c|py|cs|PHP|swift|html|htm") === -1) {
      const error = new Error("Invalid file format.");
      console.error(`${error}`);
      return;
    }

    // Read the file using the fs.readFile() method
    fs.readFile(filename, 'utf8', async function (err, data) {
      // Check for any errors while reading the file
      if (err) {
        console.error(`${err}`);
        return;
      }
      //create the chat completion with the api
      const chatCompletion = await getGroqChatCompletion(data);

      // Output token usage if the flag is set
      if (tokenUsage && chatCompletion.usage) {
        console.log(`Token usage: ${JSON.stringify(chatCompletion.usage, null, 2)}`);
      }
      
      //outputs
      if (outputfile != null) {
        //write the output to a file
        writeIntoFile(chatCompletion.choices[0]?.message?.content || "", outputfile);
      } else {
        //write output to the console.
        console.log(chatCompletion.choices[0]?.message?.content || "");
      }

      resolve(); // Resolve the promise after processing is done
    });
  });

}

// Function to write data to a file
async function writeIntoFile(data,fileName){
  fs.writeFile('Outputs/'+fileName, data, (err) => {
      // In case of a error throw err.
      if (err) throw err;
  })
}

// Define the CLI program
program
  .version('0.1')
  //.argument('<filename>...')
  .option('-s, --save <Name>', 'Put output in a file')
  .option('-t, --token-usage', 'Log token usage')  // Added this line to handle token usage flag
  .description('Auto comment for a source file')
  .action(async (options) => {
    const tokenUsage = options.tokenUsage;  // Get the value of the --token-usage flag
    for (let index = 0; index < program.args.length; index++) {
      await readFromFile(program.args[index], options.save, tokenUsage); // Added await to ensure async completion
    }
  });
// Parse the command-line arguments
program.parse(process.argv);


//main();
//console.log(readFromFile());