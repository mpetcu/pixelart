import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import Canvas from './editor/Canvas.js'
import Menu from './editor/Menu.js'
import {Container, Col, Row} from 'react-bootstrap';

function Editor(){

    const maxW = 600;
    const maxH = 600;

    let { slug } = useParams();

    const cellSize = () => {
        let c = Math.floor(maxW/layoutSize.w > maxH/layoutSize.h ? maxH/layoutSize.h : maxW/layoutSize.w);
        return c;
    }

    const [layoutSize, setLayoutSize] = useState({'w':10, 'h':10})
    const [colors, setColors] = useState(['#000000', '#FFFFFF', '#2398FF', '#89DE20', '#FFDD33', '#FF2266'])
    const [selectedColor, setSelectedColor] = useState('#000000')
    const [grid, setGrid] = useState({ })

    let data = {
        'layoutSize':layoutSize,
        'colors': colors,
        'selectedColor': selectedColor,
        'grid': grid
    };


        useEffect(() => {
         if(slug){
            fetch('http://localhost:4000/api/get/?slug='+slug)
                .then((res) => res.json())
                .then((json) => {
                    data = json.content
                    setGrid(data.grid)
                    console.log(data.grid);
                    })
                .catch(console.error);
         }
        }, []);


    return (
        <>
          <div className="editor-menu" >
              <Menu data={data}
                setLayoutSize={(f) => setLayoutSize(f)}
                setSelectedColor={(f) => setSelectedColor(f)}
              />
          </div>
          <div className="canvas-editor">
              <Canvas
                width={cellSize()*layoutSize.w}
                height={cellSize()*layoutSize.h}
                data={data}
                setGrid={(f) => setGrid(f)}
              />
          </div>
        </>
    )
}

export default Editor;