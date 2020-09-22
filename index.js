// add dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js")

// promisified version of fs.writefile to ensure file write occurs after inquirer answers returned
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

// promptUser function to obtain answers needed to geneerate README
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

// function to initialize program
function init() {

    promptUser()

        .then(function (data) {

            const README = generateMarkdown(data);

            // writing README to separate directory to avoid confusion and conflict with generator README
            return writeToFile("./readme-output/README.md", README, "utf-8");
        })

        .then(function () {

            console.log("Successfully wrote to ./readme-output/README.md");
        })

        .catch(function (err) {

            console.log(err);

        });

}

// function call to initialize program
init();