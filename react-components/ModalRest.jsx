import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

function ModalRest(props) {
  const [val, setVal] = useState(0); 

  // useEffect(() => {

  //   async function getPatrons() {
  //     const response = await fetch(`${window.location.origin}/api/restaurants`);
  //     const patrons = await response.json();
  //     setCurrentPatrons(patrons);
  //   }

  //   getPatrons();

  // }, []);
function comparePatronsToEmployees(patrons, employees){
  
  let arrayOfPatrons = [];
  for (let i = 0; i < patrons.length; i++){
   
    arrayOfPatrons.push(employees.filter(emp=> emp._id === patrons[i].patId))
  }

  return arrayOfPatrons.flat()

}

  const closeModal = () => {
    props.onHide();
  };

  const addPatron = () => {
    let newObj = {};
    newObj.restId = props.restinfo.id;
    newObj.empId = val === 0 ? props.emp[0]._id : val;
   

    fetch(`${window.location.origin}/api/restaurants`, {
      method: "POST",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => 
      {
      if (json.modifiedCount === 1){

        // let newArrayofObjs = [...props.rest]
     
      
        // let newRestObj = newArrayofObjs.filter( val => val._id === newObj.restId).flat()
        // console.log(newRestObj[0]['patrons'])
     
        // let remainingRests = newArrayofObjs.filter( val => val._id !== props.restinfo.id)
   
        // props.setRest(remainingRests)

      }
      
      else {
        alert("That employee is already a patron")
      }
      
      
  })};

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.restinfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Patrons</h3>
        <ListGroup className="mb-5">
          {props.restinfo.patrons &&              
                    
         comparePatronsToEmployees(props.restinfo.patrons, props.emp).map( val => <ListGroup.Item key={val._id}>{val.first_name}{" "}{val.last_name}</ListGroup.Item>)
            
          }         
        </ListGroup>

        <h6 className="mt-3">Select a Patron to Add to The Restaurant:</h6>
        <Form.Select size="sm" onChange={(e) => setVal(e.target.value)}>
          {props.emp.map((val) => (
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRest;
