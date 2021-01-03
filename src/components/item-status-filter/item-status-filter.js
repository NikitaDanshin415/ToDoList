import React, {Component} from "react";
import './item-status-filter.css'

export default class ItemStatusFilter extends Component{

    buttons = [
        {name:"all", label:'all'},
        {name:"active", label:'active'},
        {name:"done", label:'done'},
    ]

    render() {

        const {filter, onChangeFilter} = this.props;

        const buttons = this.buttons.map(({name,label})=>{
            const isActive = filter === name;
            const btnClassName = isActive? " btn-info" :"btn-outline-secondary" ;
            return (<button type="button"
                            className={`btn ${btnClassName}`}
                            key = {name}
                            onClick={()=>onChangeFilter(name)}
            >{label}</button>)
        });


        return (
            <div className={"btn-group"}>
                {buttons}
            </div>
        );
    }
}
