"use client"

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FolderTree from "./ui/FolderTree";
import { FiSidebar } from "react-icons/fi";
import { loadingState } from "@/states/state";
import { FolderStructure } from "@/types/FolderStructure";

interface SideBarProps {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    structure: FolderStructure;
}

export const Sidebar: React.FC<SideBarProps> = ({ hide, setHide, structure }) => {
    const [rotate, setRotate] = useState(360);
    const [loading,] = useAtom(loadingState);

    useEffect(() => {
        if (loading) setRotate(360);
        else setRotate(0);
    }, [loading])

    return (
        <div className="flex flex-col fixed w-2/12">
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
            <FolderTree structure={structure} />
        </div>
    )
}