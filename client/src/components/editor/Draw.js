import History from './History.js';

var globalIsTouching = false;
var calledFill = 0;

class Draw {

    constructor(canvas, data, callback, showLines, mouse){
        this.showLines = showLines;
        this.mouse = mouse;
        this.data = data;
        this.callback = callback;
        this.canvas = canvas;
        this.cv = {
          'ctx' : canvas.getContext('2d'),
          'w' : canvas.width,
          'h' : canvas.height,
          'ws': canvas.width/data.layoutSize.w,
          'hs': canvas.height/data.layoutSize.h
        }
    }

    drawLines(){
        if(this.showLines){
            let color = "#FFF"
            let color2 = "#CCC"
            let color3 = "#999"
            for(let wi=1; wi<this.data.layoutSize.w; wi++){
                this.cv.ctx.beginPath();
                if(wi%10===0)
                    this.cv.ctx.strokeStyle=color3
                else if(wi%5===0)
                    this.cv.ctx.strokeStyle=color2
                else
                    this.cv.ctx.strokeStyle=color
                this.cv.ctx.moveTo(wi*this.cv.ws+0.5, 0);
                this.cv.ctx.lineTo(wi*this.cv.ws+0.5, this.cv.h);
                this.cv.ctx.stroke()
            }
            for(let hi=1; hi<this.data.layoutSize.h; hi++){
                this.cv.ctx.beginPath();
                if(hi%10===0)
                    this.cv.ctx.strokeStyle=color3
                else if(hi%5===0)
                    this.cv.ctx.strokeStyle=color2
                else
                    this.cv.ctx.strokeStyle=color
                this.cv.ctx.moveTo(0, hi*this.cv.hs+0.5);
                this.cv.ctx.lineTo(this.cv.w, hi*this.cv.hs+0.5);
                this.cv.ctx.stroke()
            }
        }
      }

    drawRect(){
        for(let wi=0; wi<=this.data.layoutSize.w; wi++){
            for(let hi=0; hi<=this.data.layoutSize.h; hi++){
                if(this.data.grid.hasOwnProperty(hi+'_'+wi)){
                    let color = this.data.grid[hi+'_'+wi]
                    this.drawCell(wi, hi, color)
                }
            }
        }
    }

    clear(){
        this.cv.ctx.clearRect(0, 0, this.cv.w, this.cv.h)
    }

    drawCell(wi, hi, color){
        if(color !== ''){
            wi--
            hi--
            this.cv.ctx.fillStyle = color
            this.cv.ctx.beginPath()
            this.cv.ctx.rect(wi*this.cv.ws, hi*this.cv.hs, this.cv.ws, this.cv.hs)
            this.cv.ctx.fill()
        }
    }

    drawPointer(wi, hi){
        if(wi+hi > 0 && !this.mouse){
            wi--
            hi--
            this.cv.ctx.fillStyle = "#FFF"
            this.cv.ctx.beginPath()
            this.cv.ctx.rect(0, hi*this.cv.hs+this.cv.ws/2-1.5, this.cv.w, 3)
            this.cv.ctx.fill()
            this.cv.ctx.beginPath()
            this.cv.ctx.rect(wi*this.cv.ws+this.cv.hs/2-1.5, 0, 3, this.cv.h)
            this.cv.ctx.fill()

            this.cv.ctx.fillStyle = "#000"
            this.cv.ctx.beginPath()
            this.cv.ctx.rect(0, hi*this.cv.hs+this.cv.ws/2-0.5, this.cv.w, 1)
            this.cv.ctx.fill()
            this.cv.ctx.beginPath()
            this.cv.ctx.rect(wi*this.cv.ws+this.cv.hs/2-0.5, 0, 1, this.cv.h)
            this.cv.ctx.fill()

            if(this.data.mode !== 'move'){
                this.cv.ctx.fillStyle = "#000"
                this.cv.ctx.beginPath()
                this.cv.ctx.rect(wi*this.cv.ws-1, hi*this.cv.hs-1, this.cv.ws+2, this.cv.hs+2)
                this.cv.ctx.fill()

                this.cv.ctx.fillStyle = "#FFF"
                this.cv.ctx.beginPath()
                this.cv.ctx.rect(wi*this.cv.ws, hi*this.cv.hs, this.cv.ws, this.cv.hs)
                this.cv.ctx.fill()
            }

            if(this.data.mode === 'pen' || this.data.mode === 'fill'){
                this.cv.ctx.fillStyle = this.data.selectedColor
                this.cv.ctx.beginPath()
                this.cv.ctx.rect(wi*this.cv.ws+1, hi*this.cv.hs+1, this.cv.ws-2, this.cv.hs-2)
                this.cv.ctx.fill()
            }else if(this.data.mode === 'erase'){
                //this.cv.ctx.beginPath()
                this.cv.ctx.clearRect(wi*this.cv.ws+1, hi*this.cv.hs+1, this.cv.ws-2, this.cv.hs-2)
            }
        }

    }


    //TODO to be optimized in order to run without overflow stack
    fillRec(x, y, oldColor){

        if(oldColor == this.data.selectedColor){
            return
        }
        this.data.grid[y+'_'+x] = this.data.selectedColor;

        //top
        if(y-1 > 0 && this.fillRecCheckColor(x, y-1, oldColor)){
            this.fillRec(x, y-1, oldColor)
        }
       ///bottom
        if(y+1 <= this.data.layoutSize.h && this.fillRecCheckColor(x, y+1, oldColor)){
            this.fillRec(x, y+1, oldColor)
        }
        //left
        if(x-1 > 0 && this.fillRecCheckColor(x-1, y, oldColor)){
            this.fillRec(x-1, y, oldColor)
        }
        //right
        if(x+1 <= this.data.layoutSize.w && this.fillRecCheckColor(x+1, y, oldColor)){
            this.fillRec(x+1, y, oldColor)
        }
    }

    fillRecCheckColor(x, y, oldColor){
        if(oldColor == undefined || oldColor == ''){
            if(this.data.grid[y+'_'+x] === undefined || this.data.grid[y+'_'+x] === ''){
                return true;
            }
        }else if(oldColor === this.data.grid[y+'_'+x]){
            return true;
        }
        return false;
    }

    saveToGrid(axis){
        if(this.data.mode === 'pen'){
            this.data.grid[axis.y+'_'+axis.x] = this.data.selectedColor;
        }else if(this.data.mode === 'erase'){
            delete this.data.grid[axis.y+'_'+axis.x];
        }else if(this.data.mode === 'fill'){
            let oldColor = this.data.grid[axis.y+'_'+axis.x];
            this.fillRec(axis.x, axis.y, oldColor);
        }
        this.callback(this.data.grid, axis)
    }



    updateAxis(axis){
        this.callback(this.data.grid, axis)
    }

    captureMouse(cellSize, zoom){
        let obj = this

        let lastOn = {'x':0,'y':0};
        let lastOver = {'x':0,'y':0};

        obj.canvas.onmousedown = function(e){
            globalIsTouching = true
            History.preAdd(obj.data.grid);
            get(e)
        }
        document.onmouseup = function(e){
            if(globalIsTouching === true){
                History.add(obj.data.grid);
            }
            globalIsTouching = false
            lastOn = {'x':0,'y':0};
        }


        document.onkeydown = function(e){
              if (e.keyCode == 90 && e.ctrlKey) alert("Ctrl+z");
        }

        obj.canvas.onmouseout = function(e){
            lastOver = {'x':0,'y':0};
            obj.updateAxis(lastOver);
        }

        obj.canvas.onmousemove = function(e){
          if(globalIsTouching === true){
              get(e);
          }else{
              let mPoint = processMousePointers(e)
              if(lastOver.x !== mPoint.x || lastOver.y !== mPoint.y){
                lastOver = mPoint
                obj.updateAxis(lastOver);
              }
          }
        }

        function get(e){
            let mPoint = processMousePointers(e)
            if(lastOn.x !== mPoint.x || lastOn.y !== mPoint.y){
                lastOn = mPoint
                obj.saveToGrid(lastOn)
            }
        }

        function processMousePointers(e){
            let rect = e.target.getBoundingClientRect();
            let x = Math.ceil((e.clientX - rect.left)/cellSize);
            let y = Math.ceil((e.clientY - rect.top)/cellSize);
            return  {'x':x, 'y':y};
        }
    }
}

export default Draw