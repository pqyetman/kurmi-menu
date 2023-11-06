import "bootstrap/dist/css/bootstrap.min.css";
import clientPromise from "../lib/mongodb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { EggFried } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";

export const getServerSideProps = async () => {
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

  return (
    <Container fluid="true">
      <Navbar bg="secondary">
        <Container fluid="true">
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
      <Row className="text-center my-2">
        <Col xs={12}>
          <EggFried color={isConnected?"green":"red"} size={96} />
          <h1>Restaurant-Employee Matcher</h1>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={3}>
          <h3>Employees</h3>
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
                    {emp.first_name} {emp.last_name}
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Col>
        <Col xs={1}></Col>
        <Col xs={7}>
          <h3>Restaurants</h3>
          <InputGroup className="my-3">
            <FloatingLabel controlId="floatingInput" label="Name">
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
                  <tr key={rest._id}>
                    <td>{rest.name}</td>
                    <td>{rest.cuisine}</td>
                    <td>{rest.borough}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
}
