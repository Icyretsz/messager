'use client'
import {Button} from '@/components/ui/button';
import React, {useRef} from 'react';
import ChatboxContainer from "@/app/chatbox/components/chatboxContainer";
import useUserNameStore from "@/app/store/useUserNameStore";
import useConnectionStore from "@/app/store/useConnectionStore";
import useMessagesStore from "@/app/store/useMessagesStore";
import {MessagesType} from '../../../shared/types/types'

const URL = 'wss://47l3hcb47j.execute-api.ap-southeast-2.amazonaws.com/production/'

const WelcomePage = () => {

    const socket = useRef<WebSocket | null>(null);

    const {userName, setUserName} = useUserNameStore();
    const {isConnected, setConnected} = useConnectionStore()
    const {messages, addMessage} = useMessagesStore()

    const onSocketOpen = () => {
        setConnected(true)
        socket.current!.send(JSON.stringify(
                {
                    action: 'setName',
                    name: `${userName}`
                }
            )
        )
    }

    const onSocketMessage = (event: string) => {
        const data: MessagesType = JSON.parse(event)
        useMessagesStore.getState().addMessage(data);
    }

    const startChatting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (socket.current?.readyState !== WebSocket.OPEN && userName) {
            socket.current = new WebSocket(URL)
            socket.current.addEventListener('open', onSocketOpen)
            socket.current.addEventListener('message', (event: MessageEvent<string>) => onSocketMessage(event.data))
            return () => {
                socket.current?.removeEventListener('open', onSocketOpen);
                socket.current?.removeEventListener('message', (event) => onSocketMessage(event.data));
            };
        } else if (!userName) {
            alert('Please enter username!')
        } else {
            alert('Already connected!')
        }
    }

    return (
        !isConnected ?
            <div
                className='w-[30%] h-[30%] bg-amber-100 flex flex-col items-center justify-center gap-5 rounded-xl shadow-2xl'>
                <p className='text-5xl'> Hello </p>
                <p>Enter name to start chatting:</p>
                <form className='flex flex-col items-center justify-center gap-5'>
                    <input type='text' name='name' placeholder='Name' onChange={(e) => setUserName(e.target.value)}/>
                    <Button type='submit' className='flex items-center justify-center border-1 border-black'
                            onClick={(e) => startChatting(e)}>Submit</Button>
                </form>
            </div> :
            <ChatboxContainer socket={socket.current}/>
    )
        ;
};

export default WelcomePage;