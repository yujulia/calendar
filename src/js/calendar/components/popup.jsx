/*! Calendar event popup
**/

import React from "react/addons";
import QuickEvent from "quickevent.jsx";

/** REACT component popup
*/
class Popup extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.popup = null; // set in mount
    }

    // --------------------------- get the width and height of popup for calculations

    componentDidMount() {
        this.popup = React.findDOMNode(this.refs.popup);
    }

    // ---------------------------

    render(){
        let quickevent = <QuickEvent day={this.props.day}/>;

        return (      
            <div className="popup popup--top" ref="popup">
                <a href="#" className="use-icon popup__close">
                    <span className="icon icon-close-round"></span>
                    <span className="access-text" aria-hidden="true">close</span>
                </a>
                { quickevent }
            </div>
        );
    }
}

export default Popup;