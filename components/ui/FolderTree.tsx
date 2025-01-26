import { createFileState, createFolderState, fileState, newCompPathState } from '@/states/state';
import { FolderStructure } from '@/types/FolderStructure';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronRight, FaChevronDown, FaFile, FaFolder } from 'react-icons/fa';
import { useAtom } from "jotai";

interface FolderItemProps {
	item: FolderStructure;
	currPath?: string;
	depth?: number;
}

const FolderItem: React.FC<FolderItemProps> = ({
	item,
	currPath = "",
	depth = 0 
}) => {
	const folderItemRef = useRef<HTMLDivElement>(null);
	const [filePath, setFilePath] = useAtom(fileState);
	const [isExpanded, setIsExpanded] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [, setNewCompPath] = useAtom(newCompPathState);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
	const [showNewNameInput, setShowNewNameInput] = useState("none");
	const [, setCreateFileName] = useAtom(createFileState);
	const [, setCreateFolderName] = useAtom(createFolderState);

	const handleClick = () => {
		if (item.type === 'folder') {
			setIsExpanded(!isExpanded);
		} else {
			const updatedFilePath = currPath + "/" + item.name;
			setFilePath(updatedFilePath);
			console.log(filePath);
		}
	};

	const handleRightClick = (event: React.MouseEvent) => {
		event.preventDefault();
		if (item.type === 'folder') {
			const x = event.clientX;
			const y = event.clientY;
			setMenuPosition({ x, y });
			setShowButtons(true);
			const newCompFolderPath = currPath + "/" + item.name;
			setNewCompPath(newCompFolderPath);
			console.log(newCompFolderPath);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (folderItemRef.current && !folderItemRef.current.contains(event.target as Node)) {
			setShowButtons(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={folderItemRef}>
			<div 
				className={`flex items-center cursor-pointer hover:bg-[#2A2A2E] py-1 text-white`}
				onClick={handleClick}
				onContextMenu={handleRightClick} // Add right-click handler
				style={{ paddingLeft: `${depth * 16}px` }}
			>
				{item.type === 'folder' ? (
					isExpanded ? <FaChevronDown size={16} /> : <FaChevronRight size={16} />
				) : null}
				
				{item.type === 'folder' ? (
					<FaFolder className="mr-2" size={16} />
				) : (
					<FaFile className="mr-2" size={16} />
				)}
				
				<span>{item.name}</span>
			</div>

			{/* Context Menu for Folders */}
			{item.type === 'folder' && showButtons && (
				<div
				className="absolute bg-white border border-gray-200 shadow-lg rounded-md p-2 z-50"
				style={{
					top: menuPosition.y,
					left: menuPosition.x,
				}}
				>
				<button
					className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
					onClick={() => {
						setShowNewNameInput("folder");
						setShowButtons(false);
					}}
				>
					Create Folder
				</button>
				<button
					className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
					onClick={() => {
						setShowNewNameInput("file");
						setShowButtons(false);
					}}
				>
					Create File
				</button>
			</div>
		)}

		{/* Input Field for New Folder/File */}
		{item.type === 'folder' && showNewNameInput!="none" && (
			<div style={{ paddingLeft: `${depth * 16}px` }}>
			<input
				type="text"
				className="mt-2 px-2 py-1 bg-[#2A2A2E] text-white rounded"
				placeholder="Enter name..."
				autoFocus
				onBlur={() => setShowNewNameInput("none")}
				onKeyDown={(e) => {
				if (e.key === 'Enter') {
					if(showNewNameInput=="file") setCreateFileName(e.currentTarget.value);
					if(showNewNameInput=="folder") setCreateFolderName(e.currentTarget.value);

					setShowNewNameInput("none");
				}
				}}
			/>
			</div>
		)}

		{/* Render Children if Folder is Expanded */}
			{item.type === 'folder' && isExpanded && item.children && (
				<div>
					{Object.entries(item.children).map(([childName, child]) => (
						<FolderItem 
							key={childName}
							item={child}
							currPath={currPath + "/" + item.name}
							depth={depth + 1} 
						/>
				))}
				</div>
			)}
		</div>
	);
};

interface FolderTreeProps {
	structure: FolderStructure;
	onFileSelect?: (file: FolderStructure) => void;
}

export default function FolderTree({ 
  	structure,
}: FolderTreeProps) {
	return (
		<div className="bg-[#0A0A0A] min-h-screen p-4">
			<div className="bg-[#0A0A0A] rounded-lg p-2">
				<FolderItem 
					item={structure}
				/>
			</div>
		</div>
	);
}