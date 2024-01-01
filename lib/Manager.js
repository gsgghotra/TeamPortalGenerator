const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
         //Setting properties using parent constructor
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    //Methods
    getRole(){
        return 'Manager';
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

//Export the class
module.exports = Manager;