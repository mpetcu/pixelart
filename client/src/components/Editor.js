import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import Canvas from './editor/Canvas.js'
import Menu from './editor/Menu.js'

function Editor(){

    const [dim, setDim] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleResize = () => {
        setDim({
          width: window.innerWidth,
          height: window.innerHeight,
        });
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    const maxW = Math.floor(dim.width*0.65-16*3); //16 = 1rem
    const maxH = Math.floor(dim.height-16*2-32);

    let { slug } = useParams();

    const cellSize = () => {
        let c = Math.floor((maxW/layoutSize.w > maxH/layoutSize.h ? maxH/layoutSize.h : maxW/layoutSize.w));
        return c;
    }

    const [layoutSize, setLayoutSize] = useState({'w':100, 'h':100})
    const [colors, setColors] = useState(['#000000', '#FFFFFF', '#2398FF', '#89DE20', '#FFDD33', '#FF2266'])
    const [selectedColor, setSelectedColor] = useState(colors[0]??'#2398FF')
    const [grid, setGrid] = useState({ 'grid': {}, 'axis': {'x':0, 'y':0} })
    const [title, setTitle] = useState('Untitled')
    const [tags, setTags] = useState([{value: "Bla bla", label: "Bla bla"}])
    const [mode, setMode] = useState('fill') // Available modes: "pen", "erase", "fill", "move"

    let data = {
        'layoutSize':layoutSize,
        'colors': colors,
        'selectedColor': selectedColor,
        'grid': grid.grid,
        'axis': grid.axis,
        'title': title,
        'tags': tags,
        'mode': mode,
    };

    useEffect(() => {
     if(slug){
        fetch('http://localhost:4000/api/get/?slug='+slug)
            .then((res) => res.json())
            .then((json) => {
                data = json.content
                setGrid({'grid': data.grid, 'axis': {'x':0, 'y':0}})
                setLayoutSize(data.layoutSize)
                setColors(data.colors)
                setTitle(data.title)
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
                setColors={(f) => setColors(f)}
                setMode={(f) => setMode(f)}
                setTitle={(f) => setTitle(f)}
                setTags={(f) => setTags(f)}
                setGrid={(f) => setGrid(f)}
              />
          </div>
          <div className="canvas-editor">
            <Canvas
                dim={{'maxW': maxW, 'maxH': maxH}}
                width={cellSize()*layoutSize.w}
                height={cellSize()*layoutSize.h}
                data={data}
                cellSize={cellSize()}
                setGrid={(f) => setGrid(f)}
              />
          </div>
        </>
    )
}

export default Editor;