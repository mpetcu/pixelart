import {useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Form} from "react-bootstrap";
import { BsXLg, BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import NameAndTagsFormFields from './NameAndTagsFormFields.js';

export default function SettingsModal({data, setLayoutSize, setTitle, setTags}){

  const [modal, setModal] = useState(false);

  const options = {
    '10x10' : 'Small square',
    '9x16' : 'Small portret',
    '16x9' : 'Small landscape',

    '20x20' : 'Medium square',
    '18x32' : 'Medium portret',
    '32x18' : 'Medium landscape',

    '40x40' : 'Large square',
    '27x48' : 'Large portret',
    '48x27' : 'Large landscape',

    '60x60' : 'XLarge square',
    '36x64' : 'XLarge portret',
    '64x36' : 'XLarge landscape',

    '100x100' : 'XXLarge Square',
  }

  const defaultValueForOptions = data.layoutSize.w+'x'+data.layoutSize.h;

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  function onChangeLayoutSize(e) {
      let size = e.target.value.split('x')
      setLayoutSize({'w': size[0]*1, 'h': size[1]*1})
  }

  return (
    <>
      <BsGear onClick={showModal}/>
      <Modal show={modal} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>
                <BsGear style={{fontSize: '2.2rem', float: 'left', paddingRight: '.5rem' }}/> Settings
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>

                <NameAndTagsFormFields data={data} setTitle={setTitle} setTags={setTags} />

                <Form.Group className="mb-4">
                  <Form.Select aria-label="Default select example" onChange={onChangeLayoutSize} defaultValue={defaultValueForOptions}>

                    { Object.keys(options).map((key, index) => {
                        return (
                            <option key={index} value={key}>{key} - {options[key]}</option>
                        )
                    }) }

                  </Form.Select>
                </Form.Group>

            </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}