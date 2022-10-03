import './App.css';
import {Pagination} from "@mui/material";
import User from "./components/user";
import {useEffect, useRef, useState} from "react";

function App() {
    const [state, setState] = useState([]);
    let page = 1;
    const newUser = {
        firstname: '',
        lastname: ''
    };
    const paginationLength = useRef(null);
    const API_URL = 'http://localhost:3300/'

    const getUsers = () => {
            fetch(`${API_URL}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                throw Error()
            })
                .then((data) =>  {
                    paginationLength.current = Math.ceil(data.length / 20);
                    const showData = data.splice((page - 1) * 20, 20);
                    setState(showData) })
    }

    const createUser = (data) => {
        fetch(`${API_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "firstname" : data.firstname,
                "lastname" : data.lastname
            })
        })
            .then(async (res) => await res.json())
            .then((data) =>  {
                paginationLength.current = Math.ceil(data.length / 20);
                page = paginationLength.current;
                const showData = data.splice((page - 1) * 20, 20);
                setState(showData)}
            )
    }

    const handleChangePaginations = (event) => {
        page = event.target.innerText
        getUsers();
    }
    const handleChangeUserFirstName = (event) => {
        newUser.firstname = event.target.value;
    }
    const handleChangeUserLastName = (event) => {
        newUser.lastname = event.target.value;
    }
    const handleCreateUser = () => {
        createUser(newUser);
        getUsers();
    }

    useEffect(getUsers, [])

    return (
        <div className="App">
            <div>
                {state.map(elem => <User key={elem.id} data={elem} />)}
            </div>
            <div>
                <input type="text" onInput={handleChangeUserFirstName}/>
                <input type="text" onInput={handleChangeUserLastName}/>
                <input type="button" value="Create User" onClick={handleCreateUser}/>
            </div>
            {paginationLength ? <Pagination count={paginationLength.current} onChange={handleChangePaginations}/> : paginationLength}
        </div>
    );
}

export default App;
