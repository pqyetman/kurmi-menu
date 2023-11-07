import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function NavBar () 
{

 return(
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
 )
}