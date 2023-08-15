import { ChangeEvent, useEffect, useState } from "react"

type UsersType = {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    },
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export const Input = () => {
    const [users, setUsers] = useState<UsersType[]>()
    const [filtered, setFiltered] = useState<UsersType[]>()
    const [value, setValue] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users")
            const json = await res.json()
            setUsers(json)
            setFiltered(json)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        filteringFunc(event.currentTarget.value)
    }
    
    const filteringFunc = (value: string) => {
        const filter = users?.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
        setFiltered(filter)
    }

    const emptyFieldFunc = () => `Any name not matched! Enter valid name for filter...`

    return (
        <div>
            <h2 style={{ color: "skyblue" }}>Filtering INPUT</h2>
            <div style={{ color: "burlywood" }}>
                {error ?
                    <div style={{ color: "red" }}>
                        {error}
                    </div>
                    : loading && "Loading..."}
            </div>
            <div>
                {error ? null
                    : <input
                        type="text"
                        placeholder="Type to filter..."
                        value={value}
                        onChange={(event) => changeHandler(event)}
                    />}

            </div>
            <div>
                {filtered?.map(({ id, name }) => {
                    return (
                        <ul key={id}>
                            <li style={{ color: "burlywood" }}>{name}</li>
                        </ul>
                    )
                })}
            </div>
            <div style={{
                color: "red",
                padding: "10px"
            }}>
                {!filtered?.length ? emptyFieldFunc() : null}
            </div>
        </div>
    )
}
