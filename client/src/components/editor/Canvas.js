import { useRef, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Draw from './Draw.js'

function Canvas({width, height, data, setGrid, dim, cellSize}){

      const [ zoom, setZoom ] = useState('100')
      const [ mouse, setMouse] = useState(true)
      const [ showLines, setShowLines ] = useState(false)
      const zCell = Math.ceil(cellSize*(zoom/100))
      const zWidth = zCell*data.layoutSize.w
      const zHeight = zCell*data.layoutSize.h
      const cmt = (dim.maxH-zHeight)/2>0?(dim.maxH-zHeight)/2:0 //canvas margin top
      const cml = (dim.maxW-zWidth)/2>0?(dim.maxW-zWidth)/2:0 //canvas margin left

      const canvasRef = useRef(null)

      const onChangeZoom = (e) => {
        setZoom(e.target.value);
      }

      useEffect(() => {
        const canvas = canvasRef.current
        let draw = new Draw(canvas, data,
          (grid, axis) => {
              setGrid({'grid': grid, 'axis':axis})
          },showLines, mouse);
          draw.clear()
          draw.drawRect(canvas, data.grid)
          draw.captureMouse(zCell)
          draw.drawLines()
          draw.drawPointer(data.axis.x, data.axis.y)
      }, [data, zoom, showLines])

      return (
        <>
            <div className="canvas-zoom" style={{width: dim.maxW+'px', height: dim.maxH+'px'}}>
               <canvas ref={canvasRef} width={zWidth} height={zHeight} data={data} className="editor" style={{margin: cmt+'px 0 0 '+cml+'px', cursor: (mouse?'pointer':'none')}} />
               <div className="dot" style={{width: (zCell)+'px', height: (zCell)+'px', top: (cmt+zCell*(data.axis.y-1)+1)+'px', left: (cml+zCell*(data.axis.x-1)+1)+'px' }}/>
            </div>
            <div className="canvas-undermenu">
                <div className="coordinates">
                    <Button  size="sm" variant="outline-primary" onClick={() => setShowLines(!showLines)}>{showLines?'Hide grid':'Show grid'}</Button>{' '}
                    <Button  size="sm" variant="outline-secondary" onClick={() => setMouse(!mouse)}>{mouse?'Show axis pointer':'Show mouse pointer'}</Button>
                    <span className="text-center">{(data.axis.x+data.axis.y > 0) ? ('x:' + data.axis.x + ' - y:'+data.axis.y) : ''}</span>

                </div>
                <div className="zoom">
                    <div>Zoom</div>
                    <Form.Range onChange={onChangeZoom} min="20" max="300" step="20" value={zoom} />
                    <div className="zval">{ zoom }%</div>
                </div>
            </div>
        </>
      )
}
export default Canvas