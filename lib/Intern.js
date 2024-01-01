const Employee = require("./Employee");

// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

class Intern extends Employee{
    constructor(name, id, email, school){
         //Setting properties using parent constructor
        super(name, id, email);
        this.school = school
    }
    //Methods
    getSchool(){
        return this.school;
    }

    getRole(){
        return 'Intern'
    }
}

//Export the class
module.exports = Intern;