import {useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SaveModal({data}){

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(data.title??'')
  const [tags, setTags] = useState(data.tags??'')
  const navigate = useNavigate();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  function changeTitle(e){
    data.title = e.target.value
    setTitle(data.title);
  }

  function changeTags(e){
    data.tags = e.target.value
    setTags(data.tags)
  }

  function isDisabled(){
    console.log("isDisabled");
    if(title.length > 3 && tags.length > 3){
        return false
    }
    return true
  }

  function saveData(e){
      console.log(data);
      const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          };
          fetch('http://localhost:4000/api/add', requestOptions)
              .then(response => response.json())
              .then(returnData => {
                    console.log(returnData);
                    navigate('/'+returnData.slug)
              });
  }

  return (
    <>
      <Button variant="primary" onClick={showModal}>Save</Button>
      <Modal show={modal} onHide={hideModal}>
        <Modal.Body>
            <Form>
              <Form.Group className="mb-4">
                <Form.Label>Save as</Form.Label>
                <Form.Control type="text" placeholder="Untitled art" value={title} onChange={changeTitle} size="lg" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="#Hashtags here" value={tags} onChange={changeTags} />
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal} >Cancel</Button>
          <Button onClick={saveData} disabled={isDisabled()} >Save and publish</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default SaveModal;