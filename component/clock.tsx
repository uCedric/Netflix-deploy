import React from "react";

class Clock extends React.Component<{},{date:Date}> {
    constructor(props:any) {
      super(props);
      this.state = {date: new Date()};
    }
    timerID: number=0;
    componentDidMount() {
        this.timerID = window.setInterval(
            () => this.tick(),
            1000
        );
    }
    
    componentWillUnmount() {
        window.clearInterval(this.timerID);
    }
    tick(){
            this.setState({
                date: new Date()
            });
        }
    render() {
      return (
          
        <div className="text-white ">
            <h1 className=" text-lg right-100">Time</h1>
            <h1 className="">{this.state.date.toLocaleTimeString()}</h1>
        </div>

      );
    }
  }
  export default Clock;