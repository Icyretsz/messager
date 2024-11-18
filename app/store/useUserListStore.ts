import {create} from 'zustand'
import {UserList} from '../../../shared/types/types'

interface UserListStore {
    userList: UserList;
    setUserList: (userList: UserList) => void;
}

const useUserListStore = create<UserListStore>((set) => ({
    userList: {},
    setUserList: (userList: UserList) => set({userList : userList})
}));

export default useUserListStore;
