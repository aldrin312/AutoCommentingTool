
<!-- ABOUT THE PROJECT -->
## About The Project
Autocomment is a Cli tool that automates the process of adding meaningful comments to your source code. By integrating with OpenAI’s language models, Autocomment generates insightful comments that enhance code readability and documentation.

### Installation

1. Get a free API Key at  https://console.groq.com
2. Clone the repo
   ```sh
   git clone https://github.com/aldrin312/AutoCommentingTool.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
   ```sh
   npm install --save groq-sdk
   ```
   ```sh
   npm install commander
   ```
   ```sh
   npm install dotenv
   ```
4. Create a .env file and add your api into it
    ```sh
    GROQ_API_KEY=<api-key>
   ```
<!-- USAGE EXAMPLES -->
## Usage

To use the CLI tool make sure to change the excecution policies for windows.

To do this run windows powershell in administration mode and run the command:
   ```sh
    Set-ExecutionPolicy RemoteSigned
   ```
And then run the command:
   ```sh
    npm link
   ```
To create the CLI tool avialable to use in powershell in any directory.

Tool Execution:
   ```sh
    autocomment <filename> ...
   ```
   Command can also be executed without changing execution policy or running npm link by running this command:
   ```sh
   node index.js <filename> ...
   ```
   
Demo:

![](https://github.com/aldrin312/AutoCommentingTool/blob/main/assets/demo.gif)


Options: 
   - `--version` or `-v`: Shows the current version of Autocomment.
   - `--help` or `-h`: Shows help menu.
   - `--save <output-filename>` or `-s <output-filename>`: Saves the output to the output folder with the designated filename.
   - `--api <api-key>` or `-a <api-key>`: Input api.
   ```sh
    autocomment -s <output-filename> <filename>...
   ```

### New Feature: `--token-usage`
The `--token-usage` flag has been added to display token statistics when generating comments. This can help monitor the number of tokens used in API requests, providing insight into the cost and efficiency of the request.
#### Example Command
```sh
node index.js --token-usage <filename>
```
This will print the generated comments and output token usage statistics to the console.
#### Example Output
```json
{
  "queue_time": 0.003453426,
  "prompt_tokens": 90,
  "prompt_time": 0.010868842,
  "completion_tokens": 123,
  "completion_time": 0.1025,
  "total_tokens": 213,
  "total_time": 0.113368842
}
```

## Future features
- Customization: Allow user to specify how they want the comments to be generated
- Save the outputs to multiple files.
   

   
   
   




