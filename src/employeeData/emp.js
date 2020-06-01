
'use strict';

const fs = require('fs');
// client.msgs=require('../EmployeeDetails/employeeData.json')
let Employee=[];
const addEmployee=(details)=>{
    details.preventDefault();
    let employees={
        firstName:document.getElementById('#fName').value,
        lastName:document.getElementById('#lName').value,
        email:document.getElementById('#email').value
    }
    Employee.push(employees);
    document.forms[0].reset(); //to clear the form for next entries

    // console.warn('added',{Employee});
    // let pre=document.querySelector('#msg');
    // pre.textContent='\n'+JSON.stringify(Employee,'\t',2);

    let newJson=JSON.stringify(Employee);
     fs.writeFileSync('employeeData.json',newJson,finished);
}
function finished(err){
    console.log('success');
 }
document.addEventListener('DOMContentLoaded"',()=>{
    document.getElementById('#btn').addEventListener("click",addEmployee);

});




// server side example

// const express=require('express');
// const app = express();
// const fs = require('fs');
// const bodyParser=require('body-parser');

// app.use(bodyParser.json());

// app.put('addEmployee.html', (req, res)=>{
//   let firstName = req.body.firstName;
//   let lastName = req.body.lastName;
//   let email = req.body.email;
  
//    if(!firstName || !lastName || !email) 
//    return res.status(400).send({ error:'id, startTime and endTime are required!' });
      
  
//   fs.readFile(__dirname + '../src/employeeData/employeeData.json','utf-8',
//           (err, data)=>{
//           if(err) return res.send({error:err});

//           let employee = JSON.parse(data);
//           let idFound = false;
//           for (let i = 0; i < employee.length; i++) {
//               if (firstName == employee[i].firstName){
//                   let newTime ={id,
//                                 startTime,
//                                 endTime
//                                }

//                   myTimesList.splice(i, 1, newTime);
//                   idFoud = true;
//                   break;
//               }
//           }

//           if(!idFound) {
//               return res.send({ error:'invalid id!' });
//           }

//           fs.writeFile(__dirname +'../Admin/Data/fileName.json','utf-8' ,
//           JSON.stringify(myTimesList), 'utf-8',
//               (err)=>{
//                   if (err) return res.send({error:err});            

//                   return res.send({message:'Your file has been updated'});
//           });
//       });

// });

// const fs = require('fs');

// var update_entry = (id, st, et, fn) => {
//     var old_instance = JSON.parse(fs.readFileSync(`${fn}`, 'utf-8')); // Read the json file in
//     let found = old_instance.find(record => { return record.Id == id }); // Find the object by Id
//     st != null ? found.startTime = st : ''; // If not null, set value
//     et != null ? found.endTime = et : ''; // If not null, set value
//     let new_instance = old_instance.filter(record => { return record.Id != id }); // Copy original array besides found record
//     new_instance.push(found);return new_instance; // Add found record to new array and return
// }

// var updated = update_entry(2, 5.9999, null, 'data.json');
// console.log(updated);