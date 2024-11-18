import React from 'react';
import Sidebar from "@/app/chatbox/components/sidebar";
import Chatbox from "@/app/chatbox/components/chatbox";

interface ChatboxContainerProps {
    socket: WebSocket | null;
}

const ChatboxContainer = ({socket} : ChatboxContainerProps) => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='h-[75%] w-[75%] flex rounded-xl shadow-2xl'>
                <Sidebar socket={socket}/>
                <Chatbox socket={socket}/>
            </div>
        </div>
    );
};

export default ChatboxContainer;