/*! Calendar event edit view

    this is just a simple view that rolls out
    

**/

import React from "react/addons";


/** REACT component edit
*/
class Edit extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
       
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
      
    }

   
    render(){
        return (      
            <article className="eventEdit"/>
        );
    }
}


export default Edit;