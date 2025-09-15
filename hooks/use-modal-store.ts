import { create } from "zustand";

export type ModalType = "editCourse" | "addCourse";

type ModalStore = {
  modalType: ModalType | null;
  isModalOpen: boolean;
  courseToModify?: string | null;
  openModal: (type: ModalType, courseName?: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  isModalOpen: false,
  courseToModify: null,
  openModal: (type, courseName) => {
    set({ modalType: type, courseToModify: courseName });
    set({ isModalOpen: true });
  },
  closeModal: () => {
    set({ isModalOpen: false });
  },
}));

export default useModalStore;
