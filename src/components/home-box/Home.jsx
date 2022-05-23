import React, { useState } from 'react'
import "./home.css";
import "../styles/necessary.css";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [data, setData] = useState({
        name: '',
        room: ''
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const validation = () => {
        if (!data.name) {
            setError('Please enter the correct name')
            setTimeout(() => {
                setError('')
            }, 2000);
            return false
        }
        if (!data.room) {
            setError('Please enter the correct room name')
            setTimeout(() => {
                setError('')
            }, 2000);
            return false
        }
        setError('')
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            navigate(`/Chat/${data.room}`, { state: data })
            setData({
                name: '',
                room: ''
            })
        }
    }
    return (
        <>
            <div className="chat_box  ">
                <div className='chatroom coln_flex'>
                    <h1>Chat World</h1>
                    <form action="" className='all_center coln_flex'>
                        <label>
                            <input type="text" placeholder='Enter your name' className='chatroom_text'
                                autoComplete='off'
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <input type="text" placeholder='Enter your Room name' className='chatroom_text'
                                autoComplete='off'
                                name='room'
                                value={data.room}
                                onChange={handleChange}
                            />
                        </label>
                        {
                            error && <small className='error_box'>{error} </small>
                        }
                        <button className='btn' onClick={handleSubmit}>Enter</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home