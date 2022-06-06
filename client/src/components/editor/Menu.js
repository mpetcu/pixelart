import {Card, ListGroup, ListGroupItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsPencil, BsArrowsMove, BsEraser, BsPaintBucket, BsSliders, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SaveModal from "./SaveModal.js";
import ColorPopover from "./ColorPopover.js";
import SettingsModal from "./SettingsModal.js";
import History from "./History.js";

function Menu({data, setLayoutSize, setSelectedColor, setColors, setMode, setTitle, setTags, setGrid}){

    let iconContrastColor = '#EEE'; // other #555
    if(data.selectedColor){
        let r = parseInt(data.selectedColor.slice(1, 3), 16);
        let g = parseInt(data.selectedColor.slice(3, 5), 16);
        let b = parseInt(data.selectedColor.slice(5, 7), 16);
        if((r+g+b)/3 > 125){
            iconContrastColor = '#555';
        }
    }

    const historyLeft = () => {
        if(History.isPrev()){
            let gridH = History.getPrev();
            setGrid({ 'grid': gridH, 'axis': {'x':0, 'y':0} });
        }
    }

    const historyRight = () => {
        if(History.isNext()){
            let gridH = History.getNext();
            setGrid({ 'grid': gridH, 'axis': {'x':0, 'y':0} });
        }
    }

    return (
        <>
        <h1 className="editor-title">{data.title}</h1>
        <Card className="mb-3 mt-3">
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <div className="menu-actions">
                        <BsArrowLeft className={History.isPrev()?'bg':'bg disabled'} onClick={historyLeft} title="Undo" />
                        <BsArrowRight className={History.isNext()?'bg':'bg disabled'} onClick={historyRight} title="Reundo"/>
                        <SettingsModal data={data} setLayoutSize={setLayoutSize} setTitle={setTitle} setTags={setTags} title="Settings" />
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="menu-actions">
                        <BsPencil title="Pencil" className={data.mode === 'pen'?'sel':''}
                            style={data.mode === 'pen' ? {backgroundColor: data.selectedColor, color: iconContrastColor}:''}
                            onClick={() => setMode('pen')}/>
                        <BsEraser title="Eraser" className={data.mode === 'erase'?'sel':''} onClick={() => setMode('erase')}/>
                        <BsPaintBucket title="Fill tool" className={data.mode === 'fill'?'sel':''}
                            style={data.mode === 'fill' ? {backgroundColor: data.selectedColor, color: iconContrastColor}:''}
                            onClick={() => setMode('fill')}/>
                        <BsArrowsMove title="Move" className={data.mode === 'move'?'sel':''} onClick={() => setMode('move')}/>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="canvas-menu">
                        <div className="colors">
                            <ColorPopover data={data} setSelectedColor={setSelectedColor} setColors={setColors} iconContrastColor={iconContrastColor} />
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Card>
        <SaveModal data={data} setTitle={setTitle} setTags={setTags} />
        </>
    )

}
export default Menu;