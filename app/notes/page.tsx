"use client"

import { FiSidebar } from "react-icons/fi";
import { createFileState, createFolderState, fileState, newCompPathState, rootState } from "@/states/state";
import { useEffect, useState } from "react";
import { TipTap } from "@/components/TipTap";
import { Sidebar } from "@/components/Sidebar";
import { FolderStructure } from "@/types/FolderStructure";
import { SelectFolder } from "@/components/ui/SelectFolder";
import { getFolderStructure } from "@/utils/getFolderStructure";
import { useAtom } from "jotai";

export default function Home() {
    const [fileText, setFileText] = useState("");
    const [updateStructure, setUpdateStructure] = useState(false);
    const [hide, setHide] = useState<boolean>(false);
    const [rootPath, setRootPath] = useAtom(rootState);
    const [filePath, setFilePath] = useAtom(fileState);
    const [initialText, setInitialText] = useState("");
    const [newCompPath, setNewCompPath] = useAtom(newCompPathState);
    const [fileStructure, setFileStructure] = useState<FolderStructure>();
    const [createFileName, _setCreateFileName] = useAtom(createFileState);
    const [createFolderName, _setCreateFolderName] = useAtom(createFolderState);
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
    }, [selectedPath, updateStructure]);

    useEffect(() => {
        if(!filePath || !selectedPath) {
            return;
        }

        const fetchFileText = async () => {
            try {
                const pathParts = filePath.split("/");

                let currentDirHandle = selectedPath;

                for (let i = 2; i < pathParts.length - 1; i++) {
                    const folderName = pathParts[i];
                    currentDirHandle = await currentDirHandle.getDirectoryHandle(folderName, { create: false });
                }

                const fileName = pathParts[pathParts.length - 1];
                const fileHandle = await currentDirHandle.getFileHandle(fileName, { create: false });

                const file = await fileHandle.getFile();
                const fileText = await file.text();
        
                setInitialText(fileText);
            } catch (err) {
                console.error("Error reading file:", err);
            }
        }

        fetchFileText();
    }, [filePath]);

    useEffect(() => {
        if (!fileText || !filePath || !selectedPath) {
            return;
        }
    
        const updateFileText = async () => {
            try {
                const pathParts = filePath.split("/");
    
                let currentDirHandle = selectedPath;
    
                for (let i = 2; i < pathParts.length - 1; i++) {
                    const folderName = pathParts[i];
                    currentDirHandle = await currentDirHandle.getDirectoryHandle(folderName, { create: false });
                }
    
                const fileName = pathParts[pathParts.length - 1];
                const fileHandle = await currentDirHandle.getFileHandle(fileName, { create: false });

                const writableStream = await fileHandle.createWritable();
                await writableStream.write(fileText);
                await writableStream.close();
    
                console.log("File updated successfully!");
            } catch (err) {
                console.error("Error updating file:", err);
            }
        };
    
        updateFileText();
    }, [fileText]);

    useEffect(() => {
        console.log("path", newCompPath);
        console.log("file", createFileName);
        if(!newCompPath || !createFileName || !selectedPath) {
            return;
        }

        const createFile = async () => {
            try {
                const pathParts = newCompPath.split("/");
            
                let currentDirHandle = selectedPath;
            
                for (let i = 2; i < pathParts.length; i++) {
                    const folderName = pathParts[i];
                    currentDirHandle = await currentDirHandle.getDirectoryHandle(folderName, { create: false });
                }
            
                const fileName = createFileName;
            
                await currentDirHandle.getFileHandle(fileName, { create: true });
            
                console.log("File created successfully!");
                setUpdateStructure(!updateStructure);
            } catch (err) {
                console.error("Error creating file:", err);
            }
        };

        createFile();
    }, [createFileName]);

    useEffect(() => {
        console.log("path", newCompPath);
        console.log("folder", createFolderName);
        if(!newCompPath || !createFolderName || !selectedPath) {
            return;
        }

        const createFolder = async () => {
            try {
                const pathParts = newCompPath.split("/");
            
                let currentDirHandle = selectedPath;
            
                for (let i = 2; i < pathParts.length; i++) {
                    const folderName = pathParts[i];
                    currentDirHandle = await currentDirHandle.getDirectoryHandle(folderName, { create: false });
                }
            
                const folderName = createFolderName;

                await currentDirHandle.getDirectoryHandle(folderName, { create: true });
            
                console.log("Folder created successfully!");
                setUpdateStructure(!updateStructure);
            } catch (err) {
                console.error("Error creating folder:", err);
            }
        };

        createFolder();
    }, [createFolderName]);

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
