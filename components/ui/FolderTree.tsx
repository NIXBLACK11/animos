import { fileState } from '@/states/state';
import { FolderStructure } from '@/types/FolderStructure';
import React, { useState } from 'react';
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
	const [isExpanded, setIsExpanded] = useState(false);
	const [filePath, setFilePath] = useAtom(fileState);

	const handleClick = () => {
		if (item.type === 'folder') {
			setIsExpanded(!isExpanded);
		} else {
			const updatedFilePath = currPath + "/" + item.name;
			setFilePath(updatedFilePath);
			console.log(filePath);
		}
	};

	return (
		<div>
			<div 
				className={`flex items-center cursor-pointer hover:bg-[#2A2A2E] py-1 text-white`}
				onClick={handleClick}
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