import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function ModalEmpBody({ emp, setEmp, closeModal }) {
  const [val, setVal] = useState({ first_name: "", last_name: "", title: "" });



  const handleChange = (event) => {
    setVal((val) => {
      let newValObj = Object.assign({}, val);
      newValObj[`${event.target.name}`] = event.target.value;
      return newValObj;
    });
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
      .then((json) => {
        if (json.acknowledged) {
          let employees = emp;
          let newValObj = Object.assign({}, val);
          newValObj._id = json.insertedId;
          employees.push(newValObj);
          setEmp(employees);

          alert("Employee Added Successfully");
          closeModal();
        }
      });
  };

  return (
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
  );
}
