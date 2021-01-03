import React, {Component} from "react";

import './search-panel.css'

export default class SearchPanel extends Component{

    state = {
        term:""
    }

    onSearchChange = (e) =>{
        this.setState({term: e.target.value })
        this.props.onSearchItem(e.target.value)
    }


    render(){
        return(
                <input type='text'
                       className={"form-control search-input"}
                       placeholder="Search"
                       onChange={this.onSearchChange}
                       value={this.state.term}
                />
        );
    }

}
