import './chat.css'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";

const Chat = () => {

    const location = useLocation()
    const msgBoxRef = useRef()

    const [hide, setHide] = useState(false)
    const [data, setData] = useState({})
    const [chat, setChat] = useState('')
    const [allChat, setAllChat] = useState([])
    const [socket, setSocket] = useState()


    useEffect(() => {
        const socket = io('http://localhost:8000/')
        setSocket(socket)
        socket.on("connect", () => {
            socket.emit('joinRoom', location.state.room)
        });
    }, [])


    useEffect(() => {
        setData(location.state)
    }, [location])

    useEffect(() => {
        if (socket) {
            socket.on('getLatestMessage', fullChat => {
                setAllChat([...allChat, fullChat])
                msgBoxRef.current.scrollIntoView({ behavior: 'smooth' })
                setChat('')
            })
        }
    }, [socket, allChat])

    const handlehide = () => {
        setHide(hide => !hide)
    }
    const handleChat = e => {
        setChat(e.target.value)
    }
    const handleEnter = e => e.keyCode === 13 ? postHandle() : ""
    const postHandle = () => {
        if (chat) {
            const fullChat = { chat, name: data.name, time: new Date() }
            socket.emit('newMessage', { fullChat, room: data.room })
        }
    }
    return (
        <div className='chat_box2 '>
            <div className="parent coln_flex box_shadow"
                style={{
                    width: hide ? "" : '7rem',

                }}>
                <div className="text_row just_btw align_center">
                    <div className='marg05px'>{

                        hide ? <h3>{data.room}- Room </h3> : <h3>Chat</h3>
                    }</div>
                    <button className='btn' onClick={handlehide} >
                        <i className="fa-solid fa-angles-down"
                            style={{
                                transform: hide ? "" : 'rotate(180deg)',

                            }}></i>
                    </button>
                </div>
                <div className="container padding_halfrem" style={{
                    display: hide ? 'block' : 'none',
                }}>
                    {
                        allChat.map(msg => (
                            data.name !== msg.name ?

                                <div className="leftText marg05px just_btw coln_flex " key={msg.time} >
                                    <div className="from_chat just_btw">

                                        <small className='from_chat'>{msg.name}</small>
                                    </div>
                                    {
                                        msg.chat}
                                </div>

                                :
                                <div className="rightText marg05px just_btw coln_flex" key={msg.time}>
                                    <div className="from_chat just_btw">
                                        ''
                                        <small className='from_chat'>{msg.name}</small>
                                    </div>
                                    {msg.chat}
                                </div>
                        ))
                    }
                    <div ref={msgBoxRef}></div>
                </div>
                <div className="text_row just_btw">
                    <input type="text"
                        onDoubleClick={handlehide}
                        value={chat}
                        onChange={handleChat}
                        onKeyDown={handleEnter} />
                    <button className='btn' onClick={postHandle}>
                        <i className="fa-solid fa-paper-plane rotate"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat