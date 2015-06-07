/*! Calendar event popup
**/

import React from "react/addons";
import $ from "jquery";
import QuickEvent from "quickevent.jsx";

/** REACT component popup
*/
class Popup extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.movePopup = this.movePopup.bind(this);
        this.sendClosePopup = this.sendClosePopup.bind(this);

        this.popup = {
            element: null,
            width: 0,
            height: 0,
            show: false
        }
    }

    // --------------------------- get the width and height of popup for calculations

    componentDidMount() {
        this.popup.element = React.findDOMNode(this.refs.popup);
        this.popup.width = this.popup.element.offsetWidth;
        this.popup.height = this.popup.element.offsetHeight;
    }

    // --------------------------- close the popup by moving offscreen

    closePopup(e){
        if (e) { e.preventDefault(); }
        if (this.popup.show){
            this.popup.element.style.top = "-10000px"; 
            this.popup.element.style.left = "-10000px";
            this.popup.show = false;
        }
    }

    // --------------------------- tell parent to trigger close

    sendClosePopup(){
        $(window).trigger("calendar-closepoup");
    }

    // --------------------------- position the popup

    movePopup(){

        let type = this.props.data.type,
            target = this.props.data.target,
            container = this.props.data.container,
            containerWidth = container.offsetWidth,
            containerRECT = container.getBoundingClientRect();

        let popupType = ["popup"],
            targetRECT = target.getBoundingClientRect(),
            offsetY = targetRECT.top - containerRECT.top,
            offsetX = targetRECT.left - containerRECT.left,
            eleHeight = target.offsetHeight,
            eleWidth = target.offsetWidth,
            calcTop = offsetY - (this.popup.height+10)/2,
            calcLeft = offsetX - this.popup.width/2 + eleWidth/2;

        // calculation for week element is different
        if (type === "halfhour") {
            calcTop = offsetY - (this.popup.height + 5) + container.scrollTop;
        }

        // did we hit the top
        if ((calcTop-container.scrollTop) <= 0) {
            if (type === "day") {
                calcTop = offsetY + (eleHeight/2);
            } else {
                calcTop = offsetY + eleHeight + 5 + container.scrollTop;
            }
            popupType.push("popup--bottom");
        } else {
            popupType.push("popup--top");
        }

        // did we hit left or right
        if (calcLeft <= 0) {
            if (type === "day") {
                calcLeft = 20;
            } else {
                calcLeft = offsetX + 15;
            }
            popupType.push("popup--left");

        } else if ((calcLeft + this.popup.width) > containerWidth) {
            calcLeft = containerWidth - this.popup.width - 50;   
            popupType.push("popup--right");
        }
        

        // set the new popup class if its different
        let typeString = popupType.join(" ");
        if (typeString !== this.popup.element.className) {
            this.popup.element.className = typeString; 
        }
    
        // update popup position
        this.popup.element.style.top = calcTop + "px"; // subtract popup size here i think
        this.popup.element.style.left = calcLeft + "px";
        this.popup.show = true;
    }

    // ---------------------------

    render(){

        if (this.props.data.showPopup){
            this.movePopup();
        } else {
            this.closePopup();
        }

        let quickevent = <QuickEvent day={this.props.data.day}/>;

        return (      
            <div className="popup popup--top" ref="popup">
                <a href="#" className="use-icon popup__close" onClick={this.sendClosePopup}>
                    <span className="icon icon-close-round"></span>
                    <span className="access-text" aria-hidden="true">close</span>
                </a>
                { quickevent }
            </div>
        );
    }
}

export default Popup;