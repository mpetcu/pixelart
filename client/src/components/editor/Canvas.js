import { useRef, useEffect } from 'react'
import Draw from './Draw.js'

function Canvas({width, height, data, setGrid}){

      let gridColor = '#FFF'

      const canvasRef = useRef(null)

      const draw = canvas => {
        let draw = new Draw(canvas, data, (grid) => {
                setGrid(grid)
            })
            draw.clear()
            draw.drawRect(canvas, data.grid)
            draw.captureMouse()
            draw.drawLines(gridColor)
      }

      useEffect(() => {
        const canvas = canvasRef.current
        draw(canvas)
      }, [draw])


      return <canvas ref={canvasRef} width={width} height={height} data={data} />
}
export default Canvas