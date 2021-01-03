import React, {Component} from "react";

import "./todo-list-item.css"

export default class TodoListItem extends Component{

    constructor() {
        super();

        this.state ={
            done:false,
            important:false,
        }

        this.onLabelClick = () =>{
            this.setState((state)=>{
                return{
                    done:!state.done
                };
            });
        };

        this.onMarkImportant = () =>{
            this.setState((state)=>{
                return{
                    important:!state.important
                };
            });
        };
    }


    render() {

        const {label, onDeleted, onDone, onImportant, important, done} = this.props;


        let classNames = 'todo-list-item';

        if(done){
            classNames +=' done'
        }

        if(important){
            classNames +=' important'
        }

        return (
            <span className={classNames}>
                <span
                    className='todo-list-item-label'
                    onClick={onDone}>
                { label }
                </span>

                <button type="button"
                        className="btn btn-outline-success btn-sm float-end"
                        onClick={onImportant}
                >
                    <i className="fa fa-exclamation"/>
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-end"
                        onClick={onDeleted}
                >
                    <i className="fa fa-trash-o"/>
                </button>
            </span>
        );
    }
}

