//https://localhost:44388/api/TodoItems
export default class ToDoAPI{
    _apiBase = 'https://localhost:44388/api';


    getTodoList = async () => {
        const res = await fetch(`${this._apiBase}/TodoItems/`);

        if (!res.ok){
            throw new Error(`Could not fetch /TodoItems/, recived ${res.status}`)
        }

        return await res.json();
    }

    createTodo = async (text) =>{
        let data = {
            name: text,
            isImportant: false,
            isComplete:false
        }
        console.log(JSON.stringify(data))
        const res = await fetch(`${this._apiBase}/TodoItems/`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return res.json()
    }

    deleteTodo = async (id) =>{
        const res = await fetch(`${this._apiBase}/TodoItems/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        return res.json()
    }

   updateTodo = async (item) =>{
        let data = {
            id: item.key,
            name: item.label,
            isImportant: item.important,
            isComplete: item.done
        }
        console.log(JSON.stringify(data))
        const res = await fetch(`${this._apiBase}/TodoItems/${item.key}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return res
    }


}