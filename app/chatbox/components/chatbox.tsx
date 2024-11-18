import React, {useState} from 'react';
import useMessagesStore from "@/app/store/useMessagesStore";
import {MessagesType} from '../../../../shared/types/types'
import {Button} from "@/components/ui/button";

interface ChatboxProps {
    socket: WebSocket | null;
}

const Chatbox = ({socket} : ChatboxProps) => {

    const {messages} = useMessagesStore()

    const [message, setMessage] = useState<string>('')

    const handleOnChange = (event : string) => {
        if (event) {
            setMessage(event)
        }
    }

    const sendMessage = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message) {
            socket?.send(JSON.stringify({
                action: 'sendPublic',
                message: message,
            }))
            setMessage('')
        }
    }

    return (
        <div className='h-full w-[80%] bg-amber-100 flex flex-col items-center justify-center'>
            <div className='w-full h-[7%] bg-amber-400'>User info</div>
            <div className='w-full h-[93%] flex flex-col items-center justify-center gap-5 p-5'>
                <div className='w-full h-[75%] bg-white rounded-xl p-5 overflow-y-auto'>
                    {messages && messages.map((messageBody: MessagesType, index: number) => {
                        return (
                            <p key={index}>[{messageBody.type}] {messageBody.userName ? messageBody.userName : ''}: {messageBody.content}</p>
                        )
                    })}
                </div>
                <div className='w-full h-[25%]'>
                    <form onSubmit={(e) => sendMessage(e)} className='h-full w-full rounded-xl flex items-center gap-5'>
                    <input type='text' placeholder='Enter your message...' value={message}
                           className='h-full w-full rounded-xl'
                           onChange={(event) => handleOnChange(event.target.value)}/>
                        <Button variant='outline' type='submit'>Send</Button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Chatbox;