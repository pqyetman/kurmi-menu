import "bootstrap/dist/css/bootstrap.min.css";
import clientPromise from "../lib/mongodb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { EggFried, PlusLg, XLg } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ModalEmp from "../react-components/ModalEmp";
import ModalRest from "../react-components/ModalRest";

export const getServerSideProps = async ({ res, req }) => {

  try {
    await clientPromise;
    

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({ isConnected }) {
  const [emp, setEmp] = useState([]);
  const [rest, setRest] = useState([]);
  const [empSearch, setEmpSearch] = useState("");
  const [restSearch, setRestSearch] = useState("");
  const [restSearchField, setRestSearchField] = useState("name");
  const [modalShow, setModalShow] = useState(false);
  const [restModalShow, setRestModalShow] = useState(false)
  const [indvRestId, setIndvRestId] = useState("")

  useEffect(() => {
    async function getEmployees() {
      const response = await fetch(`${window.location.origin}/api/employees`);
      const employees = await response.json();
      setEmp(employees);
    }

    async function getRestaurants() {
      const response = await fetch(`${window.location.origin}/api/restaurants`);
      const restaurants = await response.json();
      setRest(restaurants);
    }

    getEmployees();
    getRestaurants();
  }, []);

  function filterRestWithKey(val, search, field) {
    return val.filter((val) =>
      val[`${field}`].toLowerCase().includes(search.toLowerCase())
    );
  }

  const deleteEmp = (empId) => {
    fetch(`${window.location.origin}/api/employees`, {
      method: "DELETE",
      body: JSON.stringify({ empId: empId.toString() }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.deletedCount === 1) {
          let newValObj = [...emp];
          setEmp(newValObj.filter((val) => val._id !== empId));
        } else {
          alert("Employee Could Not Be Deleted");
        }
      });
  };

  const passRestModalVal = (id, name, patrons) => {

    let newObj = Object.create({})
    newObj.name = name
    newObj.id = id;
    newObj.patrons = patrons;
    setIndvRestId(newObj);
    setRestModalShow(true);


  }

  return (
    <Container fluid="true">
      <Navbar bg="secondary">
        <Container fluid="true">
          <ModalEmp
            show={modalShow}
            onHide={() => setModalShow(false)}
            setEmp={setEmp}
            emp={emp}
          />     
          <ModalRest
              show={restModalShow}
              onHide={() => setRestModalShow(false)}
              restinfo={indvRestId}
              emp={emp}
              rest={rest}
              setRest={setRest}
          /> 
          <Navbar.Brand href="#home">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top ms-4"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Row className="text-center my-4">
        <Col xs={12}>
          <EggFried color={isConnected ? "green" : "red"} size={96} />
          <h1>Restaurant-Employee Matcher</h1>
        </Col>
      </Row>
      <Row className="text-center">
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
                      onClick={() => deleteEmp(emp._id)}
                    />
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Col>
        <Col xs={7} className="ms-2 me-5">   
            <h3>Restaurants</h3>          
          <InputGroup className="my-3">
            <FloatingLabel
              controlId="floatingInput"
              label={`${restSearchField}`}
            >
              <Form.Control
                onChange={(e) => setRestSearch(e.target.value)}
                as="input"
                placeholder="Type Employee Name Here"
              />
            </FloatingLabel>
            <Col xs={1}></Col>
            <Form.Select
              onChange={(e) => setRestSearchField(e.target.value)}
              aria-label="Default select example"
              value={restSearchField}
            >
              <option value="cuisine">Cuisine</option>
              <option value="borough">Borough</option>
              <option value="name">Name</option>
            </Form.Select>
          </InputGroup>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Cuisine Type</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filterRestWithKey(rest, restSearch, restSearchField).map(
                (rest) => (
                  <tr key={rest._id} onClick={()=>passRestModalVal(rest._id, rest.name, rest.patrons)}>
                    <td>{rest.name}</td>
                    <td>{rest.cuisine}</td>
                    <td>{rest.borough}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
