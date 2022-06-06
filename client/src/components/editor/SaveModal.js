import {useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import NameAndTagsFormFields from './NameAndTagsFormFields.js';

export default function SaveModal({data, setTitle, setTags}){

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  function saveData(e){

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
      <Button variant="outline-danger" onClick={showModal}>Cancel</Button>{' '}
      <Button variant="primary" onClick={showModal}>Save</Button>
      <Modal show={modal} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>
                <BsFileEarmarkArrowUp style={{fontSize: '2.2rem', float: 'left', paddingRight: '.5rem' }}/> Save as
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <NameAndTagsFormFields data={data} setTitle={setTitle} setTags={setTags} />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveData} type="submit" size="lg" >Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}