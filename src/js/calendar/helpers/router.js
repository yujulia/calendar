import _ from "underscore";
import $ from "jquery";
import Backbone from "backbone";

class Router extends Backbone.Router {

  constructor(){
    super();

    this.routes = {
      "" : "default",
      "month" : "month",
      "week" : "week"
    };

    this._bindRoutes();
    this.current = "month"; // starts on month

  }
  default(){
    console.log("this is default route");
    this.current = "month";
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