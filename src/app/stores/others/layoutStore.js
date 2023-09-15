import { create } from "zustand";

const useLayoutStore = create((set) => ({
  barTitle: "Set a title for the bar",
  setBarTitle: (titleText) => set((state) => (state.barTitle = titleText)),

  activeSection: "",
  setActiveSection: (value) => set({ activeSection: value }),

  showLogoutModal: false,
  setShowLogoutModal: (value) => set({ showLogoutModal: value }),

  showEditProfileModal: false,
  setShowEditProfileModal: (value) => set({ showEditProfileAccordion: value }),

  expandRole: false,
  setExpandRole: (value) => set({ expandRole: value }),

  expandSettings: false,
  setExpandSettings: (value) => set({ expandSettings: value }),

  isSidebarOpen: false,
  setIsSidebarOpen: (value) => set({ isSidebarOpen: value }),

  sidebarItemsList: [],
  setSidebarItemsList: (value) => set({ sidebarItemsList: value }),

  layoutWidth: window.innerWidth,
  setLayoutWidth: (value) => set({ layoutWidth: value }),

  showExpandedSidebarItem: false,
  setShowExpandedSidebarItem: (status) => set({ showExpandedSidebarItem: status }),
}));

export default useLayoutStore;
