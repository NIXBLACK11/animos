import { FiSidebar } from "react-icons/fi";
import FolderTree from "./ui/FolderTree";
import { FolderStructure } from "@/types/FolderStructure";

interface SideBarProps {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    structure: FolderStructure;
}

export const Sidebar: React.FC<SideBarProps> = ({ hide, setHide, structure }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center m-4">
                <img 
                    src="icon.png"
                    width={30}
                    height={30}
                    />
                <button 
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={()=>{
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