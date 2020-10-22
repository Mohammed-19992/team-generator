// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const render = require("./lib/htmlRenderer");

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

var member = [];
var newMember;
const statments = [
    {type: "list", name: "memberTitle", message: "Which team member would you like to add on the profile?", choices: ["Manager", "Engineer", "Intern", "Done adding team members!"],},
    {type: "input", name: "memberName", message: "Employee's name:",
    when: (response) => response.memberTitle !== "Done adding team members!"},
    {type: "input", name: "memberId", message: "Employee's ID:",
    when: (response) => response.memberTitle !== "Done adding team members!"},
    {type: "input", name: "memberEmail", message: "Employee's Emial address:",
    when: (response) => response.memberTitle !== "Done adding team members!"},
    {type: "input", name: "memberSchool", message: "Employee's school:",
    when: (response) => response.memberTitle === "Intern"},
    {type: "input", name: "memberGithub", message: "Employee's GitHub account:",
    when: (response) => response.memberTitle === "Engineer"},
    {type: "input", name: "memberOffice", message: "Employee's office Number:",
    when: (response) => response.memberTitle === "Manager"},
];

function addMember() {
    if (member.length === 0) {
        console.log("\n", "Thank you for choosing my Team Profile Generator App. Let's start!", "\n");
    }
    inquirer.prompt(statments).then((response) => {
        console.log("\n");
        if (response.memberTitle !== "Done adding team members!") {
            switch (response.memberTitle) {
                case "Manager": 
                newMember = new Manager(
                    response.memberName,
                    response.memberId,
                    response.memberEmail,
                    response.memberOffice,
                );
                member.push(newMember);
                break;
                case "Engineer":
                    newMember = new Engineer(
                        response.memberName,
                        response.memberId,
                        response.memberEmail,
                        response.memberGithub,
                    );
                    member.push(newMember);
                    break;
                case "Intern":
                newMember = new Intern(
                    response.memberName,
                    response.memberId,
                    response.memberEmail,
                    response.memberSchool,
                );
                    member.push(newMember);
                    break;
                    default:
                        console.log("Data Entry Done Successfully!")
            }
            addMember();
        } else {
            fs.writeFile(outputPath, render(member), (error) => {
                if (error) { return console.log(error);
                }
            });
            console.log("\n", "All is successfully done! Thanks for using the Team Profile Generator!");
        }

    });
}
addMember();
