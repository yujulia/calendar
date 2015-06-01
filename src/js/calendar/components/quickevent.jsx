/*! Calendar quick event form

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
class QuickEvent extends React.Component {

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
            <form className="quickEvent" onSubmit={this.handleSubmit}>
                <fieldset className="quickEvent__set">
                    <label className="quickEvent__label icon-calendar">
                        <span className="quickEvent__time" ref="quicktime">12/3/2 12:34pm</span>    
                    </label>
                    <input className="quickEvent__text" id="quickName" type="text" placeholder="describe your event" ref="quickname" />
                </fieldset>
                <fieldset className="quickEvent__action">
                    <CalButton text="Save" classes="button--white" id="save" />
                    <a className="quickEvent__edit icon-edit">Edit</a>   
                </fieldset>
            </form>
        );
    }
}


export default QuickEvent;