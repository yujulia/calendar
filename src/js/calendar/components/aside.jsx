/*! Calendar aisde component

**/
import React from "react";
import CalButton from "button.jsx";

class Aside extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);   
        this.handleClick = this.handleClick.bind(this);
    }

    // --------------------------- toggle view specified by button

    handleClick(){  
        console.log("create new edit");
    }

    // --------------------------- RENDER

    render(){
        return (
            <aside className="calendar__aside">
                <CalButton text="Create Event" classes="button--red" onBtnClick={this.handleClick}/>
            </aside>
        );
    }
}

export default Aside;