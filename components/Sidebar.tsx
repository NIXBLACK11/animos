"use client"

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FolderTree from "./ui/FolderTree";
import { FiSidebar } from "react-icons/fi";
import { loadingState } from "@/states/state";
import { FolderStructure } from "@/types/FolderStructure";
import { SidebarOptions } from "./ui/SidebarOptions";
import { FaChevronUp } from "react-icons/fa";

interface SideBarProps {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    structure: FolderStructure;
}

export const Sidebar: React.FC<SideBarProps> = ({ hide, setHide, structure }) => {
    const [loading,] = useAtom(loadingState);
    const [rotate, setRotate] = useState(360);
    const [optionHide, setOptionHide] = useState(false);

    useEffect(() => {
        if (loading) setRotate(360);
        else setRotate(0);
    }, [loading])

    return (
        <div className="flex flex-col fixed w-2/12 h-screen">
            <div className="flex flex-row justify-between items-center m-4">
                <motion.img
                    key={rotate}
                    src="icon.png"
                    width={30}
                    height={30}
                    animate={{ rotate: rotate }}
                    transition={{ type: "spring", duration: 4, repeat: Infinity }}
                />
                <button
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => {
                        setHide(!hide);
                    }}
                >
                    <FiSidebar />
                </button>
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
                <div className="flex-grow overflow-hidden">
                    <FolderTree structure={structure} />
                    {optionHide ? 
                        <div 
                            className="h-[5%] w-full bg-[#0A0A0A] border-neutral-800 flex justify-center items-center hover:bg-neutral-800"
                            onClick={() => setOptionHide(!optionHide)}
                        >
                            <FaChevronUp />
                        </div> :    
                        <SidebarOptions setOptionHide={setOptionHide} />
                    }
                </div>
            </div>
        </div>
    )
}
