import React from 'react';
import {
    FaGithub,
    FaGoogle,
    FaPalette,
    FaCog,
    FaChevronDown
} from 'react-icons/fa';

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
                    <button
                        className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                        title="Connect to GitHub"
                    >
                        <FaGithub className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                        <span className="text-neutral-400 group-hover:text-white text-sm">
                            Connect GitHub
                        </span>
                    </button>

                    <button
                        className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                        title="Connect to Google Drive"
                    >
                        <FaGoogle className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                        <span className="text-neutral-400 group-hover:text-white text-sm">
                            Connect Drive
                        </span>
                    </button>

                    <button
                        className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                        title="Change Theme"
                    >
                        <FaPalette className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                        <span className="text-neutral-400 group-hover:text-white text-sm">
                            Theme
                        </span>
                    </button>

                    <button
                        className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                        title="Settings"
                    >
                        <FaCog className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                        <span className="text-neutral-400 group-hover:text-white text-sm">
                            Settings
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
};