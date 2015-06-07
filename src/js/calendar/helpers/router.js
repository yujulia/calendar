import _ from "underscore";
import $ from "jquery";
import Backbone from "backbone";

class Router extends Backbone.Router {

  constructor(){
    super();

    this.routes = {
      "" : "month",
      "month" : "month",
      "week" : "week"
    };

    this._bindRoutes();

  }
  
  week(){
    console.log("this is route week");
    this.current = "week";
  }

  month(){
    console.log("this is route month");
    this.current = "month";
  }

}


export default Router;