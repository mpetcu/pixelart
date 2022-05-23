import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './List.js';
import Editor from './Editor.js';

function BodyRouter () {
    return (
      <Routes>
        <Route path='/' element={ <List /> }></Route>
        <Route path='/editor' element={ <Editor /> }></Route>
      </Routes>
    )
}
export default BodyRouter
