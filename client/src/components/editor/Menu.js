import {Card, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import SaveModal from "./SaveModal.js";

function Menu({data, setLayoutSize, setSelectedColor}){

    return (
        <Card>
            <ListGroup className="list-group-flush">
            <ListGroupItem>
                <div className="canvas-menu">

                    <div className="colors">
                        { data.colors.map((color) =>
                            <button key={color} color={color} onClick={selectColor} className={data.selectedColor == color?'sel':''} style={{ backgroundColor: color}}></button>
                        )}
                        <button><BsPlusLg /></button>
                    </div>
                    <div className="fix"></div>

                    <span className="label">Background</span>
                    <div className="bgcolors">
                        <div className="sel" color="#000" style={{ backgroundColor: '#333'}}></div>
                        <div color="#FFF" style={{ backgroundColor: '#FFF'}}></div>
                        <div color="#3FC"><BsPlusLg /></div>
                    </div>

                </div>
            </ListGroupItem>
            <ListGroupItem>
                <span className="label">Zoom</span>
                <Form.Range />
                <Button variant="secondary" size="sm">Hide grid</Button>
            </ListGroupItem>
            <ListGroupItem>
                <span className="label">Layout size</span>
                <Form.Select aria-label="Default select example" onChange={onChangeLayoutSize} size='sm'>

                  <option value="10x10">10x10 - Small square</option>
                  <option value="9x16">9x16 - Small portret</option>
                  <option value="16x9">16x9 - Small landscape</option>

                  <option value="20x20">20x20 - Medium square</option>
                  <option value="18x32">18x32 - Medium portret</option>
                  <option value="32x18">32x18 - Medium landscape</option>

                  <option value="40x40">40x40 - Large square</option>
                  <option value="27x48">27x48 - Large portret</option>
                  <option value="48x27">48x27 - Large landscape</option>

                </Form.Select>
            </ListGroupItem>
            <ListGroupItem>
                <SaveModal data={data} />
            </ListGroupItem>
            </ListGroup>
        </Card>
    )

    function onChangeLayoutSize(e) {
        let size = e.target.value.split('x')
        setLayoutSize({'w': size[0]*1, 'h': size[1]*1})
    }

    function selectColor(e){
        let color = e.target.getAttribute('color')
        setSelectedColor(color)
    }

}
export default Menu;