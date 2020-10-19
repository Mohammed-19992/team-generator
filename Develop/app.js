const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var member = [];
var newmEmber;
const statments = [
    {type: "list", name: "role", message: "Which team member would you like to add?", choices: ["Manager", "Engineer", "Intern", "Done adding team members!"],},
    {type: "input", name: "memberName", message: "Employee's name:",
    when: (answer) => answer.role !== "Done adding team members!"},
    {type: "input", name: "memberId", message: "Employee's ID:",
    when: (answer) => answer.role !== "Done adding team members!"},
    {type: "input", name: "memberSchool", message: "Employee's school:",
    when: (answer) => answer.role === "Intern"},
    {type: "input", name: "memberEmail", message: "Employee's Emial address:",
    when: (answer) => answer.role === "Engineer"},
    {type: "input", name: "memberGitHub", message: "Employee's GitHub account:",
    when: (answer) => answer.role === "Engineer"},
    {type: "input", name: "memberOffice", message: "Employee's office Number:",
    when: (answer) => answer.role === "Manager"},
];

function addEmployee() {
    if (member.length === 0) {
        console.log("\n", "Thank you for using the Team Profile Generator App", "]n");
    }
    inquirer.prompt(statments).then(answer) => {
        console.log("\n");
        if (answer.role !== "Done adding team members!") {
            switch (answer.role) {
                case "Manager": 
                newMember = new Manager(
                    answer.memberName,
                    answer.memberId,
                    answer.memeberSchool,
                    answer.memberOffice,
                );
                member.push(newMember);
                break;
                case "Intern":
                newMember = new Intern(
                    answer.memberName,
                    answer.memeberId,
                    answer.memberSchool,
                    answer.memberEmail,
                );
                member.push(newMember);
                break;
                case "Engineer":
                    newMember = new Engineer(
                        answer.memberName,
                        answer.memberId,
                        answer.memberEmail,
                        answer.memberGitHub,
                    );
                    member.push(newmember);
                    break;
                    default:
                        console.log("Data Entry Done Successfully!")
            }
            addEmployee();
        } else {
            fs.writeFile(outputPath, render(member), (error) => {
                if (error) { return console.log(error);
                }
            });
        }

    }
}
getMember();

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
// for the provided `render` function to work! ```
