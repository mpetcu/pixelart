import { useState } from 'react'
import Canvas from './editor/Canvas.js'
import Menu from './editor/Menu.js'
import {Container, Col, Row} from 'react-bootstrap';


function Editor(){

    const maxW = 600;
    const maxH = 600;

    const cellSize = () => {
        let c = Math.floor(maxW/layoutSize.w > maxH/layoutSize.h ? maxH/layoutSize.h : maxW/layoutSize.w);
        return c;
    }
    const getCalcW = () => {
        return cellSize()*layoutSize.w
    }

    const [layoutSize, setLayoutSize] = useState({'w':10, 'h':10})
    const [colors, setColors] = useState(['#000', '#FFF', '#29F', '#8D2', '#FD3', '#F26'])
    const [selectedColor, setSelectedColor] = useState('#000')
    const [grid, setGrid] = useState({ '1_1': '#000', '1_2': '#222', '1_3': '#444', '1_3': '#666' })

    let data = {
        'layoutSize':layoutSize,
        'colors': colors,
        'selectedColor': selectedColor,
        'grid': grid
    };

    return (
        <Container fluid className="mt-3">
          <Row>
            <Col xs={5} md={4} lg={3} >
                <Menu data={data}
                    setLayoutSize={(f) => setLayoutSize(f)}
                    setSelectedColor={(f) => setSelectedColor(f)}
                />
            </Col>
            <Col xs={7} md={8}  lg={9}>
                <Canvas
                    width={cellSize()*layoutSize.w}
                    height={cellSize()*layoutSize.h}
                    data={data}
                    setGrid={(f) => setGrid(f)}
                />
            </Col>
          </Row>
        </Container>
    )
}

export default Editor;