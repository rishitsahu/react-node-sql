import './App.css';
import Axios from 'axios';
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const updateEmployee=()=>{
    Axios.put("http://localhost:3001/update",{
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success")
    });
  }
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success")
    });
  };
  const getEmployee=()=>{
    Axios.get("http://localhost:3001/employees").then((response)=>{
      setEmployeeList(response.data)
    })
  }
  const deleteEmployee=()=>{
    Axios.delete(`http://localhost:3001/${name}`).then(()=>{
      console.log("deleted succesfully");
    })
  }
  return (

    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployee}>Get Employee</button>
        {
          employeeList.map((val,key)=>{
            return <div> {val.name} </div>
          })
        }
        <button onClick={deleteEmployee}>Delete Employee</button>
        <button onClick={updateEmployee}>Update Employee</button>
      </div>
      
      </div>
  );
}

export default App;
