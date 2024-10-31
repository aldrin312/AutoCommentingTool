# Contributing Guidelines

### 1. Feature Requests

If requesting a new feature, create an issue and describe the new feature. Please be descriptive and detailed on the new feature. Adding an immage and/demo of the feature is highly welcomed.


### 2. Code Contributing 

#### Fork the Repository

1. Click the "Fork" button in the upper right corner of the repository.

2. Clone your forked repository to your local machine:

```bash

   git clone https://github.com/aldrin312/AutoCommentingTool.git

```

### Create a New Branch

1. Create a new branch for your feature or bug fix:

```bash

git checkout -b my-feature-branch

```

#### Make Your Changes

1. Make the necessary changes in the newly created branch.

2. Follows the project coding style.

3. Document the changes, Add comments on the changes.

#### Source Code Formater (Prettier)
- Format specific file.
```bash

npx prettier [filename] --write

```
- Format all files
```bash

npx prettier . --write

```

#### Run Linter (ESLint)
- Run linter of specific file
```bash

npx eslint [filename]

```
- Run linter on all files
```bash

npx eslint .

```

#### Set up for running linter on save (VSCode)

1. Install ESLint plugin

2. Install Eslint globally
```bash

npm eslint -i eslint -g

```

3. Modify VSCode settings.json
   - File -> Preference -> Settings -> search: on save > workspace -> edit settings.json for editor

4. Add this code:
```
{
    "editor.codeActionsOnSave": {
        
        
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
    
}
```
5. Eslint will now run and fix the format for the code.

### Commit Your Changes

1. Stage your changes:

```bash

git add .

```

2. Commit your changes with a descriptive message:

```bash

git commit -m "Add feature/fix bug: [brief description]"

```


### Push to Your Fork


#### Push your changes to your forked repository:

```bash

git push origin my-feature-branch

```



## Create a Pull Request

1. Go to the original repository and click on "Pull Requests."

2. Click "New Pull Request."

3. Select your branch and provide a description of your changes

4. Add an image of the change or a demo is preferable if possible in the pull request.

5. Click "Create Pull Request."


## Waiting for Review 

A project maintainer will review your pull request.

---
