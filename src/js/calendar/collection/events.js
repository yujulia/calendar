/** events collection
*/
import _ from "Underscore";
import $ from "jquery";
import Backbone from "Backbone";
import LocalStorage form "Backbone.localStorage";

class EventCollection extends Backbone.Collection {

    constructor() {
        super();
        this.model = QuickEvent;
        this.id = "calendarclone-events";

        this.localStorage = new LocalStorage(this.id);
    }

}

export default EventCollection;