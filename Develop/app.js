const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
    {
        message: "What is the employee's name?",
        type: "input",
        name: "name",
    },
    {
        message: "What is the employee's ID?",
        type: "input",
        name: "id",
    },
    {
        message: "What is the employee's email?",
        type: "input",
        name: "email",
    },

];

function askForEmployeeRole() {

    console.log("------------------");
    console.log("Add a new team member");
    console.log("------------------");

    inquirer
        .prompt({
                    message: "What is the employee's role?",
                    name: "role",
                    type: "list",
                    choices: [
                        "Engineer",
                        "Intern",                        
                    ]
                })
        .then((response) => {

            if (response.role === "Engineer") {

                askForEngineerInfo()          

            } else if (response.role === "Intern") {

                askForInternInfo()

            } 
        });

}

function askToContinue () {
    inquirer
        .prompt({
                    message: "Do you want to add another team member",
                    name: "addNew",
                    type: "list",
                    choices: [
                        "Yes",
                        "No",                        
                    ]                 
                    
                })
        .then(({addNew}) => {

            if (addNew == "Yes") {

                askForEmployeeRole();              

            } else {

                createHtmlFile();           

            }
        });

}

function askForEngineerInfo () {

    console.log("------------------");
    console.log("Add a new Engineer");
    console.log("------------------");

    inquirer
        .prompt([
            ...employeeQuestions,
            {
                message: "What is the employee's GitHub username?",
                type: "input",
                name: "github",
            }
        ])
        .then(({name, id, email, github}) => {                  
              
            employees.push(new Engineer (name, id, email, github));
         
            askToContinue();            

        })
    
}

function askForInternInfo () {
  
    console.log("------------------");
    console.log("Add a new Intern");
    console.log("------------------");

    inquirer
        .prompt([
            ...employeeQuestions,
            {
                message: "What is the employee's school?",
                type: "input",
                name: "school",
            }
        ])
        .then(({name, id, email, school}) => {

            employees.push(new Intern (name, id, email, school));
         
            askToContinue();

        });
            
}

function askForManagerInfo () {
    
    console.log("------------------");
    console.log("Add a new Manager");
    console.log("------------------");

    inquirer
        .prompt([
            ...employeeQuestions,
            {
                message: "What is the employee's office number?",
                type: "input",
                name: "officeNumber",
            }
        ])
        .then(({name, id, email, officeNumber}) => {

            employees.push(new Manager (name, id, email, officeNumber));
         
            askForEmployeeRole();

        })
            
}

function createHtmlFile () {

    const html = render(employees); 

    if ( ! fs.existsSync(OUTPUT_DIR)) {

        fs.mkdirSync(OUTPUT_DIR);

    }

    fs.writeFile(outputPath, html, (err) => {

        if (err) console.log(err);

        else console.log ("HTML file created");

    })

}

askForManagerInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
