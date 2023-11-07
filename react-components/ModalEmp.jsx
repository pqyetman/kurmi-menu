import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalEmpBody from "./ModalEmpBody";


function ModalEmp(props) {  

  const {emp,setEmp, ...rest} = props;

  const closeModal = () => {    
    props.onHide()
  };



  return (
    <Modal
      {...rest}
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
        <ModalEmpBody emp={emp} setEmp={setEmp} closeModal={closeModal}/>     
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEmp;
