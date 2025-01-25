import React, { useState } from 'react';
import { FaCirclePlus, FaFolder } from 'react-icons/fa6';

type SelectFolderProps = {
    selectedPath: string;
    setSelectedPath: React.Dispatch<React.SetStateAction<string>>;
  };
  
export const SelectFolder: React.FC<SelectFolderProps> = ({ selectedPath, setSelectedPath }) => {    
    const handleCreateVault = async () => {
        try {
            if (window.showDirectoryPicker) {
                const directoryHandle = await window.showDirectoryPicker();
    
                const animosVaultHandle = await directoryHandle.getDirectoryHandle("animosVault", {
                    create: true,
                });
                
                setSelectedPath(animosVaultHandle.name);
            } else {
                alert("Your browser doesn't support folder creation.");
            }
        } catch (err) {
            console.error("Error creating vault:", err);
        }
    };

    const handleSelectFolder = async () => {
        try {
            if (window.showDirectoryPicker) {
                const directoryHandle = await window.showDirectoryPicker();
                const folderName = directoryHandle.name;
                setSelectedPath(folderName);

                setSelectedPath(folderName);
            } else {
                alert("Your browser doesn't support folder selection.");
            }
        } catch (err) {
            console.error('Error selecting folder:', err);
        }
    };
  

    return (
        <div className="min-h-screen bg-[#0F0F10] flex justify-center items-center text-white">
        <div className="bg-[#1A1A1E] rounded-lg p-8 w-full max-w-md shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Create New Vault</h1>
            
            <div className="space-y-4">
            <button 
                onClick={handleSelectFolder}
                className="w-full flex items-center justify-center bg-[#2C2C2E] hover:bg-[#3A3A3E] transition-colors py-3 rounded-md"
            >
                <FaFolder className="mr-2" />
                Select Existing Folder
            </button>

            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <button 
                onClick={handleCreateVault}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-md"
            >
                <FaCirclePlus className="mr-2" />
                Create New Vault
            </button>
            </div>

            {selectedPath && (
            <div className="mt-4 text-sm text-gray-400 text-center">
                Selected Path: {selectedPath}
            </div>
            )}
        </div>
        </div>
    );
}