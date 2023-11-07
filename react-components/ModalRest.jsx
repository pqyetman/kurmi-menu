import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalRestBody from "./ModalRestBody"


function ModalRest(props) {

const { onHide, emp, rest, setRest, restinfo, ...remaining } = props;





  const closeModal = () => {
    onHide();
  };


  
  return (
    <Modal
      {...remaining}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          {restinfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalRestBody
        restinfo={restinfo}
        emp={emp}
        rest={rest}
        setRest={setRest}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRest;
