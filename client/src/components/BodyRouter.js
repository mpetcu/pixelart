import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './List.js';
import Editor from './Editor.js';
import Show from './Show.js';

function BodyRouter () {
    return (
      <Routes>
        <Route path='/' element={ <List /> }></Route>
        <Route path='/editor' element={ <Editor /> }></Route>
        <Route path='/editor/:slug' element={ <Editor /> }></Route>
        <Route path='/:slug' element={ <Show /> }></Route>
      </Routes>
    )
}
export default BodyRouter
