import React, {Component} from 'react';
import './item-add-form.css'

export default class ItemAddForm extends Component{

    state = {
        label : ''
    }

    onLabelChange=(e)=>{
        this.setState({
            label: e.target.value,
        })

    }

    onSubmit = (e) =>{
        e.preventDefault()
        this.props.onCreateItem(this.state.label)

        this.setState({
            label:"",
        })
    }

    render(){
        return(
            <form className="ItemAddForm d-flex"
                onSubmit={this.onSubmit}>

                <input type='text'
                       className="form-control ItemAddForm_add"
                       placeholder='Add new to do item'
                       onChange={this.onLabelChange}
                       value={this.state.label}
                />
                <button
                    className="btn btn-primary"
                    type='submit'

                >Add</button>
            </form>
        )
    }

}
