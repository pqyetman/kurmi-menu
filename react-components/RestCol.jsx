import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function RestCol({
  setIndvRestId,
  setRestModalShow,
  setRestSearch,
  setRestSearchField,
  rest,
  restSearchField,
  restSearch
  
}) {


  function filterRestWithKey(val, search, field) {
    return val.filter((val) =>
      val[`${field}`].toLowerCase().includes(search.toLowerCase())
    );
  }

  const passRestModalVal = (id, name, patrons) => {
    let newObj = Object.create({});
    newObj.name = name;
    newObj.id = id;
    newObj.patrons = patrons;
    setIndvRestId(newObj);

    setRestModalShow(true);
  };

  return (
    <Col xs={7} className="ms-2 me-5">
      <h3>Restaurants</h3>
      <InputGroup className="my-3">
        <FloatingLabel controlId="floatingInput" label={`${restSearchField}`}>
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
          {filterRestWithKey(rest, restSearch, restSearchField).map((rest) => (
            <tr
              key={rest._id}
              onClick={() =>
                passRestModalVal(rest._id, rest.name, rest.patrons)
              }
            >
              <td>{rest.name}</td>
              <td>{rest.cuisine}</td>
              <td>{rest.borough}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}
