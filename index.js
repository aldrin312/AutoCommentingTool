import Groq from "groq-sdk";
import fs from "fs";

const groq = new Groq({ apiKey: "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" });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(data) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Add comments to this function " + data,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export async function readFromFile(){

    // Use fs.readFile() method to read the file
    fs.readFile('testFile.js', 'utf8',async function (err, data) {
        // Display the file content
       // console.log(data);
       const chatCompletion = await getGroqChatCompletion(data);
       // Print the completion returned by the LLM.
       writeIntoFile(chatCompletion.choices[0]?.message?.content || "");
       //console.log(chatCompletion.choices[0]?.message?.content || "");
    });
    //console.log("data read")

}

function writeIntoFile(data){
  fs.writeFile('Output.txt', data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
})
}


//main();
console.log(readFromFile());