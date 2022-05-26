
class Draw {

    constructor(canvas, data, callback){
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

    drawLines(color){
        for(let wi=1; wi<this.data.layoutSize.w; wi++){
            this.cv.ctx.beginPath();
            this.cv.ctx.strokeStyle=color;
            this.cv.ctx.moveTo(wi*this.cv.ws+0.5, 0);
            this.cv.ctx.lineTo(wi*this.cv.ws+0.5, this.cv.h);
            this.cv.ctx.stroke()
        }
        for(let hi=1; hi<this.data.layoutSize.h; hi++){
            this.cv.ctx.beginPath();
            this.cv.ctx.strokeStyle=color;
            this.cv.ctx.moveTo(0, hi*this.cv.hs+0.5);
            this.cv.ctx.lineTo(this.cv.w, hi*this.cv.hs+0.5);
            this.cv.ctx.stroke()
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
        wi--
        hi--
        this.cv.ctx.fillStyle = color
        this.cv.ctx.beginPath()
        this.cv.ctx.rect(wi*this.cv.ws, hi*this.cv.hs, this.cv.ws, this.cv.hs)
        this.cv.ctx.fill()
    }

    saveToGrid(currentOn, color){
        this.data.grid[currentOn.h+'_'+currentOn.w] = this.data.selectedColor;
        this.drawCell(currentOn.w, currentOn.h, this.data.selectedColor);
        this.drawLines();
        console.log(this.data.grid);
        this.callback(this.data.grid);
    }

    captureMouse(){
        let obj = this
        let isTouching = false;
        let lastOn = {'w':null,'h':null};

        obj.canvas.onmousedown = function(e){
            isTouching = true
            get(e)
        }
        document.onmouseup = function(e){
            isTouching = false
        }

        obj.canvas.onmousemove = function(e){
            if(isTouching == true){
                get(e);
            }
        }

        function get(e){
            let rect = e.target.getBoundingClientRect();
            let relW = e.clientX - rect.left;
            let relH = e.clientY - rect.top;
            let currentOn = {
                'w': Math.ceil(relW/obj.cv.ws),
                'h': Math.ceil(relH/obj.cv.hs)
            }
            if(currentOn.w != lastOn.w || currentOn.h != lastOn.h){
                obj.saveToGrid(currentOn, '#f00')
                lastOn = currentOn
            }

        }
    }
}

export default Draw