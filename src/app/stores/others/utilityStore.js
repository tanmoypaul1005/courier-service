import { alpha, styled, Switch } from "@mui/material";
import { create } from "zustand";

const useUtilityStore = create((set) => ({
  loggedUser: {
    name: "",
    email: "",
  },
  setLoggedUser: (value) => set({ loggedUser: value }),

  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),

  isLoadingSearch: false,
  setLoadingSearch: (value) => set({ isLoadingSearch: value }),

  secondaryClick: false,
  setSecondaryClick: (status) => set((state) => (state.secondaryClick = status)),

  showImagePopup: false,
  setShowImagePopup: (value) => set({ showImagePopup: value }),

  showImagePreviewSRC: "",
  setShowImagePreviewSRC: (value) => set({ showImagePreviewSRC: value }),

  showEditProfileModal: false,
  setShowEditProfileModal: (value) => set({ showEditProfileModal: value }),

  showEditAccordion: false,
  setShowEditAccordion: (value) => set({ showEditAccordion: value }),

  showImageUploadViewModal: false,
  setShowImageUploadViewModal: (value) => set({ showImageUploadViewModal: value }),

  showLogoutModal: false,
  setShowLogoutModal: (value) => set({ showLogoutModal: value }),

  ImageUploadView: false,
  setImageUploadView: (value) => set({ ImageUploadView: value }),


  numOfUnreadNotification: 0,
  setHasUnseenNotification: () => {
    let count = localStorage.getItem('numOfUnreadNotification');
    set({ numOfUnreadNotification: count ? parseInt(count) : 0 })
  },

  notification: [],
  setNotification: (value) => set({ notification: value }),

  isLoadingNotification: false,
  setIsLoadingNotification: (value) => set({ isLoadingNotification: value }),

  showCompanyDetailsModal: false,
  setShowCompanyDetailsModal: (value) => set({ showCompanyDetailsModal: value }),

}));

export const MuiCustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FB607F',
    '&:hover': {
      backgroundColor: alpha('#FB607F', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FB607F',
  },
}));




export default useUtilityStore;
