import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import { PlusLg, XLg } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function EmployeeCol({emp, setEmp, empSearch, setEmpSearch, setModalShow}){

    const deleteEmp = (empval) => {
        fetch(`${window.location.origin}/api/employees`, {
          method: "DELETE",
          body: JSON.stringify({ empId: empval._id.toString() }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.deletedCount === 1) {
              let newValObj = [...emp];
              setEmp(newValObj.filter((val) => val._id !== empval._id));
              alert( `${empval.first_name} has been terminated`)
            } else {
              alert("Employee Could Not Be Deleted");
            }
          });
      };

    return (
        <Col xs={3} className="mx-5 justify-content-center">
          <Stack
            direction="horizontal"
            className="justify-content-center"
            gap={3}
          >
            <h3>Employees</h3>
            <Button
              style={{ width: "40px", height: "40px" }}
              variant="outline-secondary"
              onClick={() => setModalShow(true)}
            >
              <PlusLg size={15} />
            </Button>
          </Stack>
          <FloatingLabel
            controlId="floatingInput"
            label="Search By Name"
            className="m-3"
          >
            <Form.Control
              size="sm"
              as="input"
              placeholder="Type Employee Name Here"
              onChange={(e) => setEmpSearch(e.target.value.toString())}
            />
          </FloatingLabel>

          <ListGroup variant="flush" className="mx-3">
            {emp.length > 0 &&
              emp
                .filter(
                  (employee) =>
                    employee.first_name
                      .toLowerCase()
                      .includes(empSearch.toLowerCase()) ||
                    employee.last_name
                      .toLowerCase()
                      .includes(empSearch.toLowerCase())
                )
                .map((emp) => (
                  <ListGroup.Item key={emp._id}>
                    {emp.first_name} {emp.last_name}{" "}
                    <XLg
                      size={15}
                      color="red"
                      onClick={() => deleteEmp(emp)}
                    />
                  </ListGroup.Item>
                ))}
          </ListGroup>
                  
        </Col>
    )
}