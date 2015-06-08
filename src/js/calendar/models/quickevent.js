/** event model
*/
import _ from "Underscore";
import $ from "jquery";
import Backbone from "Backbone";

class QuickEvent extends Backbone.Model {

    constructor(){
        super();
        
        this.defaults = {
            start: new Date(),
            end: new Date(date.getTime() + minutes*60000),
            name: "untitled event",
            desc: "shenanigans";
        }

    }

    initialize(){
        console.log("init quick event");
    }

    validate(){

    }

}

export default QuickEvent;