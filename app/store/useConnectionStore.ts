import {create} from 'zustand'

interface ConnectionStore {
    isConnected: boolean;
    setConnected: (isConnected : boolean) => void;
}

const useConnectionStore = create<ConnectionStore>((set) => ({
    isConnected: false,
    setConnected: (isConnected : boolean) => set({isConnected: isConnected}),
}));

export default useConnectionStore;
