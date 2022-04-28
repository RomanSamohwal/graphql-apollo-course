import React, {useEffect, useState} from 'react';
import './App.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
        variables: {
            id: 1
        }
    })
    const [newUser] = useMutation(CREATE_USER)

    const [users, setUsers] = useState<any>([])
    const [username, setUsername] = useState<string>()
    const [age, setAge] = useState<number>(0)

    console.log(oneUser)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (e: any) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }

    const getAll = (e: any) => {
        e.preventDefault()
        refetch()
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text"/>
                <input value={age} onChange={e => setAge(Number(e.target.value))} type="number"/>
                <div className="btns">
                    <button onClick={(e) => addUser(e)}>Создать</button>
                    <button onClick={(e)=> getAll(e)}>Получить</button>
                </div>
                <div>
                    {users.map((user: any) =>
                        <div>{user.id}. {user.username} {user.age}</div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default App;
