import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";

export default function ModalRestBody({ restinfo, setRest, emp, rest }) {


  const [val, setVal] = useState(0);



  function comparePatronsToEmployees(patrons, employees) {
    let arrayOfPatrons = [];
    for (let i = 0; i < patrons.length; i++) {
      arrayOfPatrons.push(
        employees.filter((emp) => emp._id === patrons[i].patId)
      );
    }

    return arrayOfPatrons.flat();
  }

  const addPatron = () => {
    let newObj = {};
    newObj.restId = restinfo.id;
    newObj.empId = val === 0 ? emp[0]._id : val;

    fetch(`${window.location.origin}/api/restaurants`, {
      method: "POST",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.modifiedCount === 1) {
          let newArrayofObjs = [...rest];

          let newRestObj = newArrayofObjs
            .filter((val) => val._id === newObj.restId)
            .flat();
          newRestObj[0].patrons.push({ patId: newObj.empId });

          let remainingRests = newArrayofObjs.filter(
            (val) => val._id !== restinfo.id
          );
          remainingRests.push(newRestObj[0]);

          setRest(remainingRests);
        } else {
          alert("That employee is already a patron");
        }
      });
  };

  return (
    <>
      <h3>Patrons</h3>
      <ListGroup className="mb-5">
        {restinfo.patrons &&
          comparePatronsToEmployees(restinfo.patrons, emp).map((val) => (
            <ListGroup.Item key={val._id}>
              {val.first_name} {val.last_name}
            </ListGroup.Item>
          ))}
      </ListGroup>

      <h6 className="mt-3">Select a Patron to Add to The Restaurant:</h6>
      <Form.Select size="sm" onChange={(e) => setVal(e.target.value)}>
        {emp.map((val) => (
          <option key={val._id} value={val._id}>
            {val.first_name} {val.last_name}
          </option>
        ))}
      </Form.Select>
      <Button
        variant="outline-secondary"
        className="mt-2"
        onClick={() => {
          addPatron();
        }}
      >
        Add
      </Button>
    </>
  );
}
