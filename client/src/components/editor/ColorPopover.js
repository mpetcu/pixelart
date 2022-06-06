import { useState, useEffect, useRef} from 'react';
import { Popover, OverlayTrigger} from "react-bootstrap";
import { BsPalette, BsTrash, BsFillXCircleFill, BsFillCheckCircleFill, BsFillCircleFill, BsCheck2} from "react-icons/bs";
import { HexColorPicker } from "react-colorful";

function ColorPopover({data, setSelectedColor, setColors, iconContrastColor}){

  const [popover, setPopover] = useState(false);
  const [delMode, setDelMode] = useState(false);
  const [color, setColor] = useState(data.selectedColor);

  const hidePopover = () => {
    setPopover(false);
  };

  function addColor(){
    hidePopover();
    data.colors.push(color)
    setColors(data.colors)
    setSelectedColor(color)
  }

  function removeColor(color) {
     setColors(data.colors.filter(function(ele){
         return ele !== color;
      }))
  }

  const popoverRef = useRef(null);
  useEffect(() => {
  function handleClickOutside(e) {
        if (popoverRef.current && !popoverRef.current.contains(e.target)) {
          setPopover(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [popoverRef]);

  const colorPicker = (
    <Popover className="color-popover">
        <Popover.Body ref={popoverRef}>
            <HexColorPicker color={color} onChange={setColor}/>
            <div className="mt-3 color-overlay">
                <BsFillCircleFill style={{color:color}} className="preview"/>
                <BsFillCheckCircleFill onClick={addColor} className="add" />
                <BsFillXCircleFill onClick={hidePopover} className="dismiss" />
                <div className="fix"/>
            </div>
        </Popover.Body>
    </Popover>
  );

  function selectColor(e){
      let color = e.target.getAttribute('color')
      setSelectedColor(color)
  }


  return (
    <>
        { data.colors.map((color) =>
            <span key={color} color={color} onClick={delMode === true?() => removeColor(color):selectColor} style={{ backgroundColor: color}}>
                {delMode === true ? (
                    <BsFillXCircleFill onClick={() => removeColor(color)} className="del" />
                ):''}
                {data.selectedColor === color && delMode === false ? <BsCheck2 className="sel" color={color} style={{color: iconContrastColor}} />:''}
            </span>
        )}
        <div className="fix"/>
        <button onClick={() => setDelMode(!delMode)} className={delMode?'selDel':''}><BsTrash/></button>
        {/*delMode == false ? (*/}
            <OverlayTrigger placement="bottom" overlay={colorPicker} show={popover} >
               <button onClick={() => setPopover(true)} ><BsPalette/></button>
            </OverlayTrigger>
        {/* }):''} */}
    </>
  )
}
export default ColorPopover;