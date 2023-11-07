import { EggFried } from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HeadComponent({ isConnected }) {
  return (
    <Row className="text-center my-4">
      <Col xs={12}>
        <EggFried color={isConnected ? "green" : "red"} size={96} />
        <h1>Restaurant-Employee Matcher</h1>
      </Col>
    </Row>
  );
}
