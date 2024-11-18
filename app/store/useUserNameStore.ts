import {create} from 'zustand'

interface UserNameStore {
    userName: string;
    setUserName: (userName: string) => void;
}

const useUserNameStore = create<UserNameStore>((set) => ({
    userName: '',
    setUserName: (userName) => set({userName: userName}),
}));

export default useUserNameStore;
