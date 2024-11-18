import {create} from 'zustand'
import {MessagesType} from '../../../shared/types/types'

interface MessagesStore {
    messages: MessagesType[];
    addMessage: (messages: MessagesType) => void;
}

const useMessagesStore = create<MessagesStore>((set) => ({
    messages: [],
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),
}));

export default useMessagesStore;
