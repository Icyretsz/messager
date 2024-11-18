import React from 'react';
import useUserNameStore from "@/app/store/useUserNameStore";
import { FaPowerOff } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import useConnectionStore from "@/app/store/useConnectionStore";
import useUserListStore from "@/app/store/useUserListStore";

interface SidebarProps {
    socket: WebSocket | null;
}

const Sidebar = ({socket} : SidebarProps) => {
    const {userName} = useUserNameStore()
    const {setConnected} = useConnectionStore()
    const {userList} = useUserListStore()

    const disconnect = () => {
        if (socket) {
            setConnected(false)
            socket.close()
        }
    }

    return (
        <div className='h-full w-[20%] bg-amber-400'>
            <div className='w-full h-[7%] bg-amber-400 flex justify-between items-center p-2'>
                <p className='text-xl font-bold'>{userName}</p>
                <Button variant='ghost' onClick={disconnect}><FaPowerOff className='size-5'/></Button>
            </div>
            <div className='w-full h-[93%] flex flex-col items-center justify-center gap-5 p-5'>
                <div>
                    {}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;