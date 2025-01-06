"use client"

import { useEffect, useState } from "react";

import { TipTap } from "@/components/TipTap";
import { FiSidebar } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
    const { status } = useSession();
    const router = useRouter();

    const [hide, setHide] = useState<boolean>(false);
    
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('../');
        }
    }, [status, router]);

    return (
        <div className="h-screen w-screen max-w-screen overflow-x-hidden text-white">
            {(!hide) ? 
                <div className="w-full h-full flex flex-row">
                    <div className="w-2/12 flex flex-col justify-between bg-[#0A0A0A]">
                        <Sidebar hide={hide} setHide={setHide}/>
                    </div>
                    <div className="w-10/12">
                        <TipTap />
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
                        <TipTap />
                    </div>
                </div>
            }
        </div>
    );
}
