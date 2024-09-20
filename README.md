
<!-- ABOUT THE PROJECT -->
## About The Project
This is an Auto Commenting CLI Tool that uses OpenAI. It can take any source code and output to the console or in a file a commented version of that file.

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
   node index.js testfiles/testFile.js
   ```
Options: \
   `--save <output-filename>` or `-s <output-filename>`- saves the output to the output folder with the designated filename.
   Example:
   ```sh
    autocomment -s <output-filename> <filename>...
   ```

   
   
   




