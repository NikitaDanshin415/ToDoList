import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel/";
import ToDoList from "../todo-list/";
import ItemStatusFilter from "../item-status-filter/";

import './app.css';
import ItemAddForm from "../item-add-form";
import toDoAPI from '../../servise/toDoAPI'

export default class App extends Component{

    iter = 0;

    toDoAPI = new toDoAPI()


    parceTodoItem = (item) => {
        return {key: item.id, label: item.name, done:item.isComplete, important: item.isImportant};
    }

    state={
        toDoData :[],
        term:'',
        filter: 'all',
    }

    componentDidMount() {
        this.toDoAPI.getTodoList().then((res)=>{
            let toDoArr = [];

            for (let item in res) {
                toDoArr.push(this.parceTodoItem(res[item]));
            }
            this.iter = res[res.length-1].id
            this.setState({
                toDoData : toDoArr
            })
        })
    }

    //----------------------------------------------------------------------------------------------------------------------

    toggleProperty (arr, id ,propName) {
        const idx = arr.findIndex((el) => el.key === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        this.toDoAPI.updateTodo(newItem);

        return [
            ...arr.slice(0,idx),
            newItem,
            ...arr.slice(idx+1)
        ]
    }

    deleteItem = (id) => {
        this.toDoAPI.deleteTodo(id);
        const idx = this.state.toDoData.findIndex((el) => el.key === id);

        const data = [
            ...this.state.toDoData.slice(0,idx),
            ...this.state.toDoData.slice(idx+1)
        ];

        this.setState((state) => {
            return {
                toDoData: data
            }
        });
    };

    addItem = (text) => {
        if(text!==""){
            this.toDoAPI.createTodo(text).then((res)=> {
                const item = this.parceTodoItem(res);

                this.setState(({ toDoData }) => {
                    return {
                        toDoData: [...toDoData, item]
                    }
                })

            });
        }
    };

    onToggleImportant = (id) => {
        this.setState(({toDoData}) => {
            return {toDoData: this.toggleProperty(toDoData, id, 'important')};
        });
    };

    onToggleDone = (id) => {
        this.setState(({toDoData}) => {
            return {toDoData: this.toggleProperty(toDoData, id, 'done')};
        });
    };
//----------------------------------------------------------------------------
    searchItem = (text) =>{
        this.setState({
            term: text,
        })
    }

    search = (arr, term) =>{
        return arr.filter((el) => el.label.toLowerCase().includes(term.toLowerCase()))
    }


    changeFilter = (text) =>{
        this.setState({
            filter: text,
        })
    }

    filter(items, filter){
        switch (filter){
            case "all":
                return items
            case "done":
                return items.filter((el)=> el.done)
            case "active":
                return items.filter((el)=> !el.done)
            default:
                return items;
        }
    }

    render(){
        const items = this.state.toDoData.length
        const doneItems = this.state.toDoData.filter((el)=> el.done).length

        const visibleItems = this.search(this.state.toDoData, this.state.term)


        const filterItems = this.filter(visibleItems, this.state.filter)



        return(
            <div className="todo-app">
                <AppHeader toDo={items} done={doneItems}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchItem = {this.searchItem}/>
                    <ItemStatusFilter filter={this.state.filter}  onChangeFilter = {this.changeFilter}/>
                </div>

                <ToDoList todos={filterItems}
                          onDeleted={this.deleteItem}
                          onImportant = {this.onToggleImportant}
                          onDone = {this.onToggleDone}
                />

                <ItemAddForm
                    onCreateItem={this.addItem}
                />
            </div>
        );
    }
}










