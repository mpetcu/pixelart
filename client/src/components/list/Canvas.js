import { useRef, useEffect } from 'react'
import Draw from '../editor/Draw.js'

function Canvas({width, height, data, setGrid}){

      const canvasRef = useRef(null)

      const draw = canvas => {
        let draw = new Draw(canvas, data, (grid) => {
            setGrid(grid)
        })
        draw.drawRect(canvas, data.grid)
      }

      useEffect(() => {
        const canvas = canvasRef.current
        draw(canvas)
      }, [draw])

      return <canvas ref={canvasRef} width={width} height={height} data={data} />
}
export default Canvas