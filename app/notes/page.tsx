"use client"

import { FiSidebar } from "react-icons/fi";
import { fileState, rootState } from "@/states/state";
import { useEffect, useState } from "react";
import { TipTap } from "@/components/TipTap";
import { Sidebar } from "@/components/Sidebar";
import { FolderStructure } from "@/types/FolderStructure";
import { SelectFolder } from "@/components/ui/SelectFolder";
import { getFolderStructure } from "@/utils/getFolderStructure";
import { useAtom } from "jotai";

export default function Home() {
    const [hide, setHide] = useState<boolean>(false);
    const [rootPath, setRootPath] = useAtom(rootState);
    const [filePath, setFilePath] = useAtom(fileState);
    const [initialText, setInitialText] = useState("");
    const [fileText, setFileText] = useState("");
    const [fileStructure, setFileStructure] = useState<FolderStructure>();
    const [selectedPath, setSelectedPath] = useState<FileSystemDirectoryHandle | null>(null);

    useEffect(() => {
        if(!selectedPath) {
            return;
        }

        const fetchStructure = async () => {
            setRootPath(selectedPath.name);
            const structure: FolderStructure = await getFolderStructure(selectedPath);
            setFileStructure(structure);
        }

        fetchStructure();
    }, [selectedPath]);

    useEffect(() => {
        if(filePath=="") {
            return;
        }

        const fetchFileText = async () => {
            // const fileData: string = await fetchFileData(filePath);
            
            setInitialText("Hello World");
        }

        fetchFileText();
    }, [filePath]);

    useEffect(() => {
        console.log(fileText);
    }, [fileText]);

    return (
        <div className="h-screen w-screen max-w-screen overflow-x-hidden text-white bg-[#0F0F10]">
            {(!selectedPath) ? 
                <SelectFolder selectedPath={selectedPath} setSelectedPath={setSelectedPath}/>
            :
                <>
                    {(!hide) ? 
                        <div className="w-full h-full flex flex-row">
                            <div className="w-2/12 flex flex-col justify-between bg-[#0A0A0A]">
                                {fileStructure && (
                                    <Sidebar hide={hide} setHide={setHide} structure={fileStructure}/>
                                )}
                            </div>
                            <div className="w-10/12">
                                <TipTap initialText={initialText} setFileText={setFileText}/>
                            </div>
                        </div>
                    :
                    <div className="w-full h-full flex flex-row">
                            <div className="w-[3%] flex flex-col items-center justify-start bg-[#0A0A0A]">
                            <div className="flex flex-row justify-between items-center m-4">
                                <button 
                                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                    onClick={()=>{
                                        setHide(!hide);
                                    }}    
                                >
                                    <FiSidebar />
                                </button>
                                    </div>
                            </div>
                            <div className="w-[97%]">
                                <TipTap initialText={initialText} setFileText={setFileText}/>
                            </div>
                        </div>
                    }   
                </>
            }
        </div>
    );
}
