import React from 'react';
import { FaFile } from 'react-icons/fa';

export const EditorHome = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#0F0F10] text-white">
            <div className="max-w-2xl w-full p-8 rounded-lg bg-[#0A0A0A] shadow-lg">
                <div className="flex flex-col items-center space-y-6">

                    <div className="flex items-center space-x-3">
                        <FaFile size={32} className="text-white opacity-80" />
                        <h1 className="text-4xl font-bold">Animos</h1>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-xl italic opacity-90">
                            "Σκέψη Ελεύθερη, Γνώση Αιώνια"
                        </p>
                        <p className="text-sm opacity-70">
                            (Free Thought, Eternal Knowledge)
                        </p>
                    </div>

                    <div className="mt-8 text-center opacity-60">
                        <p>Select a file to begin editing</p>
                        <p className="text-sm mt-2">or create a new one</p>
                    </div>
                </div>
            </div>
        </div>
    );
};