import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function ModalEmp(props) {
  const [val, setVal] = useState({ first_name: "", last_name: "", title: "" });

  const handleChange = (event) => {
    setVal((val) => {
      let newValObj = Object.assign({}, val);
      newValObj[`${event.target.name}`] = event.target.value;
      return newValObj;
    });
  };

  const closeModal = () => {
    props.onHide();
    setVal({ first_name: "", last_name: "", title: "" });
  };

  const submitData = (e) => {
    e.preventDefault();
   
    fetch(`${window.location.origin}/api/employees`, {
      method: "POST",
      body: JSON.stringify(val),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => 
      {
        if (json.acknowledged){

          let employees = props.emp
          let newValObj = Object.assign({}, val);
          newValObj._id = json.insertedId
          employees.push(newValObj);
          props.setEmp(employees)
        }

      }
      );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitData}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="John"
              onChange={handleChange}
              value={val.first_name}
              name="first_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Doe"
              onChange={handleChange}
              value={val.last_name}
              name="last_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Title"
              onChange={handleChange}
              value={val.title}
              name="title"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEmp;
