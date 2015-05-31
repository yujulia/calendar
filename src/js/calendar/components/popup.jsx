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

**/

import React from "react/addons";


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

   
    render(){
        return (      
            <div className="popup" ref="popup"/>
        );
    }
}


export default Popup;