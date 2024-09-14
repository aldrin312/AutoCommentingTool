(WIP README)

<!-- ABOUT THE PROJECT -->
## About The Project
This is an Auto Commenting CLI Tool that uses OpenAI.

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

<!-- USAGE EXAMPLES -->
## Usage

To use the CLI tool make sure to change the excecution policies for windows.

To do this run windows powershell in administration mode and run the command:
   ```sh
    Set-ExecutionPolicy RemoteSigned
   ```
And then run the command 
   ```sh
    npm link
   ```
To create the CLI tool avialable to use in powershell in any directory.

Tool Execution:
   ```sh
    Autocomment <filename>
   ```


