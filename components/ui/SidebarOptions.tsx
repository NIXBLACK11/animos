import React from 'react';
import {
    FaPalette,
    FaChevronDown
} from 'react-icons/fa';
import { GoogleLoginButton } from './GoogleLoginButton';

interface SidebarOptionsProps {
    setOptionHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarOptions: React.FC<SidebarOptionsProps> = ({ setOptionHide }) => {
    return (
        <div className="fixed bottom-0 left-0 w-2/12 bg-[#0A0A0A] border-t border-neutral-800">
            <button 
                className='flex justify-center items-center w-full hover:bg-neutral-800 py-2'
                onClick={()=>setOptionHide((prev)=>!prev)}
            >
                <FaChevronDown />
            </button>

            <div className="p-4">
                <div className="flex flex-col space-y-4">
                    <GoogleLoginButton />

                    <button
                        className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                        title="Change Theme"
                    >
                        <FaPalette className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                        <span className="text-neutral-400 group-hover:text-white text-sm">
                            Select Model
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
};