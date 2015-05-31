/*! Calendar event popup

    this is always attached to the main view
    when something is clicked, pip to parent calendar
    parent also tells child that is selected to have some on state color
    this is poped up in the correct position

    input from this form
        - create - submit and parse 
                    - create row in table
                    - create block in week

        - edit - info in field passed to edit view

    need to check boundaries of the browser window in case this runs off

    REGEX a number, if there is and a p after, add to TODAY if nothing is selected

**/

import React from "react/addons";

import CalButton from "./button.jsx";

/** REACT component popup
*/
class Popup extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
       
    }

    // --------------------------- find pointer and start timer

    componentDidMount() {
       
    }

    componentWillUnmount() {
      
    }

    handleSubmit(){

    }
   
    render(){
        return (      
            <div className="popup" ref="popup">
                <form className="eventForm" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label>When:</label>
                        <span>some time here</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="eventName">What:</label>
                        <input id="eventName" type="text" placeholder="your event" ref="eventName" />
                    </fieldset>
                    <fieldset>
                        <CalButton text="Save" id="save" />
                        <CalButton text="Edit" id="edit" />
                    </fieldset>
                </form>
            </div>
        );
    }
}


export default Popup;