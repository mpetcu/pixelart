import {useState, Component} from 'react';
import {Form, InputGroup, FormControl} from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

export default function NameAndTagsFormFields({data, setTitle, setTags}){

    return (
    <>
      <Form.Group className="mb-4">
        <Form.Control type="text" placeholder="Untitled" defaultValue={data.title}  onChange={(e)=> setTitle(e.target.value)} size="lg"/>
      </Form.Group>

      <Form.Group className="mb-4">
        <CreatableMulti setTags={setTags} tags={data.tags}/>
        <Form.Text id="passwordHelpBlock" muted>
             Add minimum 3 tags
        </Form.Text>
     </Form.Group>

    </>
  )

}

function CreatableMulti({tags, setTags}) {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'Coffe', label: 'Coffe' }
    ];

    const handleChange = (
        newValue: OnChangeValue<ColourOption, true>,
        actionMeta: ActionMeta<ColourOption>
    ) => {
        setTags(newValue);
        console.log(newValue);
    };

    return (
      <CreatableSelect
        placeholder="Search and select, or add a new tag"
        isMulti
        defaultValue={tags}
        onChange={handleChange}
        options={options}
      />
    );

}