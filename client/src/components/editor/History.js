
var localHistory = [];
var localHistoryIndex = 0;
var preSaveHistory = true;

export default class History  {
    //store last 100 actions
    static add(data){
        let copyData = Object.assign({}, data)
        if(localHistory.push(copyData) > this.limit){
          localHistory.shift()
        }
        localHistoryIndex = localHistory.length-1;
        preSaveHistory = false;
    }

    static preAdd(data){
        if(preSaveHistory){
            History.add(data)
        }
    }

    static isNext(){
      return localHistoryIndex < localHistory.length-1;
    }

    static isPrev(){
      return localHistoryIndex > 0
    }

    static getNext(){
      if(this.isNext()){
            let copyData = Object.assign({}, localHistory[++localHistoryIndex])
            preSaveHistory = true;
    		return copyData;
      }
      	return null;
    }

    static getPrev(){
      if(this.isPrev()){
            let copyData = Object.assign({}, localHistory[--localHistoryIndex])
            preSaveHistory = true
    		return copyData;
      }
      	return null;
    }

    static count(){
        return localHistory.length;
    }


    static clear(){
        localHistory = [];
        localHistoryIndex = 0;
    }
}