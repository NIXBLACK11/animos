import { FiSidebar } from "react-icons/fi";
import DriveUploader from "./DriveUploader";

interface SideBarProps {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SideBarProps> = ({ hide, setHide }) => {
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
            <DriveUploader />
        </div>
    )
}