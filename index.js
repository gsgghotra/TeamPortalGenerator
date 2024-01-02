const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

//Location where template will be exported to
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


//Questions for inquirer
const managerQuestions = [{
    type: 'input',
    name: 'managerName',
    message: 'Please Enter Manager\'s Name?',
    },
    {
    type: 'input',
    name: 'managerId',
    message: 'Please Enter Manager\'s Id?',
    },
    {
    type: 'input',
    name: 'managerEmail',
    message: 'Please Enter Manager\'s Email?',
    },
    {
    type: 'input',
    name: 'managerOfficeNumber',
    message: 'Please Enter Manager\'s OfficeNumber?',
    }]
const engineerQuestions = [{
    type: 'input',
    name: 'engineerName',
    message: 'Please Enter Engineer\'s Name?',
    },
    {
    type: 'input',
    name: 'engineerId',
    message: 'Please Enter Engineer\'s Id?',
    },
    {
    type: 'input',
    name: 'engineerEmail',
    message: 'Please Enter Engineer\'s Email?',
    },
    {
    type: 'input',
    name: 'engineerGithubUsername',
    message: 'Please Enter Engineer\'s Github Username?',
    }]
const internQuestions = [{
    type: 'input',
    name: 'internName',
    message: 'Please Enter Intern\'s Name?',
    },
    {
    type: 'input',
    name: 'internId',
    message: 'Please Enter Intern\'s Id?',
    },
    {
    type: 'input',
    name: 'internEmail',
    message: 'Please Enter Intern\'s Email?',
    },
    {
    type: 'input',
    name: 'internSchool',
    message: 'Please Enter Intern\'s School Name?',
    }]

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data,
        (err) => err ? console.log(err) : 
        //Print generating readme when user finishes answering the questions
        console.log('Generating template... \n The html file can be found in output folder.')
    );
}

// function to initialize program
function init() {
        let list =[]
        inqrirerQuestions("manager", managerQuestions, list);
}

const additionalMenu =(list) => {
    inquirer
    .prompt({
        type: 'list',
        message: 'Choose an option:',
        name: 'choice',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        })
    .then(data =>{
        if(data.choice === 'Add an engineer'){
            inqrirerQuestions("engineer", engineerQuestions, list);
        } else if(data.choice === 'Add an intern'){
            inqrirerQuestions("intern", internQuestions, list);
        } else if(data.choice === 'Finish building the team'){
            generateTemplate(list)
        }
    })
}

//Function to ask questions and generate objects
const inqrirerQuestions = (choice, questions, list) =>{
    inquirer
    .prompt(questions)
    .then( data => {
        let role;
        //Create objects based on the chosen option
        if (choice === "manager"){
            role = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber);
        } else if(choice === "engineer"){
            role = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithubUsername); 
        } else if(choice === "intern"){
            role = new Intern(data.internName, data.internId, data.internEmail, data.internSchool); 
        }
        //Update the list
        list.push(role);
        //Pass the updated list to the menu and display menu
        additionalMenu(list);
    })
}

const generateTemplate = list => {
    const generateTemplateFile = render(list);
    writeToFile(outputPath, generateTemplateFile);
}

//Run the init function
init();