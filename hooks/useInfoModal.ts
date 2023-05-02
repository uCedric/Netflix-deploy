import {create} from 'zustand';

export interface ModalStoreInterface{
    movieid?:string;
    isOpen:boolean;
    openModal:(movieid:string) => void;
    closeModal:()=>void;
}

const useInfoModal = create<ModalStoreInterface>((set)=>({
    movieid:undefined,
    isOpen:false,
    openModal : (movieid:string) => set({isOpen:true,movieid}),
    closeModal : () => set({isOpen:false,movieid:undefined}),
}));

export default useInfoModal;