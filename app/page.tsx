"use client"

import { useState } from "react";

import { TipTap } from "@/components/TipTap";
import { FaIceCream } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";

export default function Home() {
	const [hide, setHide] = useState<boolean>(false);

	return (
		<div className="h-screen w-screen bg-[#ffffff] max-w-screen overflow-x-hidden">
			{(!hide) ? 
				<div className="w-full h-full flex flex-row">
					<div className="w-2/12 flex flex-col justify-between bg-gray-200">
						<div className="flex flex-row justify-between items-center m-4">
							<FaIceCream className="text-2xl"/>
							<FiSidebar className="text-2xl hover:text-gray-700" onClick={()=>{
								setHide(!hide);
							}} />
						</div>
					</div>
					<div className="w-10/12">
						<TipTap />
					</div>
				</div>
			:
				<div className="w-full h-full flex flex-row">
					<div className="w-[4%] flex flex-col justify-between bg-gray-200">
						<FiSidebar className="text-2xl m-4" onClick={()=>{
							setHide(!hide);
						}} />
					</div>
					<div className="w-[96%]">
						<TipTap />
					</div>
				</div>
			}
		</div>
	);
}
