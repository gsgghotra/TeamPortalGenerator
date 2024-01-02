const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Questions
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

const render = require("./src/page-template.js");
// TODO: Write Code to gather information about the development team members, and render the HTML file.

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data,
        (err) => err ? console.log(err) : 
        //Print generating readme when user finishes answering the questions
        console.log('Generating Readme... \n The Readme file can be found in exports folder.')
    );
}

// function to initialize program
function init() {
    inquirer
    .prompt([{
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
        }],
        )
    .then((data)=>{
        //console.log(data);
        let list =[]
        let role = new Manager(data.managerName, data.managerID, data.managerEmail, data.managerOfficeNumber)
        //console.log([role]);
        list.push(role)
        additionalMenu(list);
    })
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
        console.log(data)
        if(data.choice === 'Add an engineer'){
            inqrirerQuestions("engineer", engineerQuestions, list)
            console.log("Engineer added")
        } else if(data.choice === 'Add an intern'){
            console.log("Intern added")
        } else if(data.choice === 'Finish building the team'){
            console.log("Finished quiz")
            generateTemplate(list)
        }
    })
}
const inqrirerQuestions = (choice, questions, list) =>{
    inquirer
    .prompt(questions)
    .then( data => {
        let role;
        //Create objects based on the chosen option
        if(choice === "engineer"){
            role = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.engineerGithubUsername); 
        } else if(choice === "intern"){
            role = new Engineer(data.internName, data.internID, data.internEmail, data.internSchool); 
        }
        //Update the list
        list.push(role)
        //Pass the updated list to the menu
        additionalMenu(list)
    })
}

const generateTemplate = list => {
    const generateTemplateFile = render(list);
    const filename = `output/team.html`; //Filename is fixed
    writeToFile(filename, generateTemplateFile);
}
init();