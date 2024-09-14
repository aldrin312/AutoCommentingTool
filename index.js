#!/usr/bin/env node

import Groq from "groq-sdk";
import fs from "fs";
import { program } from "commander";
import {} from 'dotenv/config'


// Initialize the Groq API with the provided API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function main() {
//   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.choices[0]?.message?.content || "");
// }

// Function to get the chat completion from the LLM
export async function getGroqChatCompletion(data) {
    // Create a new chat completion request with the LLM model and the user message
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Add comments to this file without altering the code" + data,
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Function to read a file from the file system
export async function readFromFile(filename){
    // Read the file using the fs.readFile() method
  fs.readFile(filename, 'utf8',async function (err, data) {
    // Check for any errors while reading the file
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }
    const chatCompletion = await getGroqChatCompletion(data);
    //writeIntoFile(chatCompletion.choices[0]?.message?.content || "");

    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
  });
}
// Function to write data to a file
function writeIntoFile(data){
  fs.writeFile('Output.js', data, (err) => {
      // In case of a error throw err.
      if (err) throw err;
  })
}

// Define the CLI program
program
    .version('0.1')
    .argument('<filename>...')
    .description('Auto comment for a source file')
    .action(async filename=> {
      for (let index = 0; index < program.args.length; index++) {
        //console.log(program.args[index]);
        console.log(readFromFile(program.args[index]));
      }
    });

// Parse the command-line arguments
program.parse(process.argv);


//main();
//console.log(readFromFile());