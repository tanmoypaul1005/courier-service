import { create } from 'zustand';

const useHomeStore = create((set, get) => ({
  requests: [],
  setRequests: (data) => set({ requests: data }),
  selected_card: [true, false, false, false, false, false],
  setSelectedCard: (data) => set({ selected_card: data }),

}));


export default useHomeStore;