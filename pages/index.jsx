import "bootstrap/dist/css/bootstrap.min.css";
import clientPromise from "../lib/mongodb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import ModalEmp from "../react-components/ModalEmp";
import ModalRest from "../react-components/ModalRest";
import HeadComponent from "../react-components/HeadComp";
import NavBar from "../react-components/NavBar";
import EmployeeCol from "../react-components/EmployeeCol";
import RestCol from "../react-components/RestCol";

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
  const [modalShow, setModalShow] = useState(false);
  const [restModalShow, setRestModalShow] = useState(false);
  const [indvRestId, setIndvRestId] = useState("");

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

 


  return (
    <Container fluid="true">
      <NavBar/>
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
      <HeadComponent isConnected={isConnected}/>   
      <Row className="text-center">
        <EmployeeCol 
        setEmp={setEmp}
        emp={emp} 
        empSearch={empSearch}
        setEmpSearch={setEmpSearch}
        setModalShow={setModalShow}        
        />
        <RestCol
         setIndvRestId={setIndvRestId}
         setRestModalShow={setRestModalShow}
         setRestSearch={setRestSearch}
         setRestSearchField={setRestSearchField}
         rest={rest}
         restSearchField={restSearchField}     
         restSearch={restSearch}
        />
        
      </Row>
    </Container>
  );
}
