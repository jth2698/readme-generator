const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeToFile = util.promisify(fs.writeFile);

// array of questions for user
const questions = [

    "What is the title of your project?",
    "Enter a description for your project",
    "Enter the installation instructions for your project",
    "Enter the usage information for your project",
    "Enter the contribution guidelines for your project",
    "Enter the test instructions for your project",
    "Choose a license for your project",
    "Enter your GitHub username",
    "Enter your email address",
];

function promptUser() {

    return inquirer.prompt([

        {
            type: "input",
            name: "title",
            message: questions[0]
        },
        {
            type: "input",
            name: "description",
            message: questions[1]
        },
        {
            type: "input",
            name: "installation",
            message: questions[2]
        },
        {
            type: "input",
            name: "usage",
            message: questions[3]
        },
        {
            type: "input",
            name: "contribution",
            message: questions[4]
        },
        {
            type: "input",
            name: "testing",
            message: questions[5]
        },
        {
            type: "list",
            choices: ["mit", "gnu", "apache"],
            name: "license",
            message: questions[6]
        },
        {
            type: "input",
            name: "github",
            message: questions[7]
        },
        {
            type: "input",
            name: "email",
            message: questions[8]
        },
    ])
}

function generateREADME(answers) {

    let licenseBadge;

    if (answers.license == "mit") {
        licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    }
    if (answers.license == "gnu") {
        licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    }
    if (answers.license == "apache") {
        licenseBadge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    }

    return `
# ${answers.title} ${licenseBadge}

## Description
${answers.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution Guidelines](#contribution)
* [Testing](#testing) 
* [License](#license)
* [Questions](#questions)
    
## Installation
${answers.installation}

## Usage
${answers.usage}

## Contribution Guidelines
${answers.contribution}

## Testing
${answers.testing}

## License
${answers.license}

## Questions
${answers.github}
${answers.email}
   `;

}

// function to initialize program
function init() {

    promptUser()

        .then(function (answers) {

            const README = generateREADME(answers);

            return writeToFile("./readme-output/README.md", README, "utf-8");
        })

        .then(function () {

            console.log("Successfully wrote to README.md");
        })

        .catch(function (err) {

            console.log(err);

        });

}

// function call to initialize program
init();