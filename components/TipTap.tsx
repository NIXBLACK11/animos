'use client'

import { useEditor, EditorContent } from '@tiptap/react'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import {common, createLowlight} from 'lowlight'
import { FaAngleDown, FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaStrikethrough, FaTable } from 'react-icons/fa'
import { useState } from 'react'

const lowlight = createLowlight(common)

export const TipTap = () => {
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

  const headingOptions = [
    'H1',
    'H2',
    'H3',
  ];

  const tableOptions = [
	{ label: 'Insert table', action: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
	{ label: 'Add column before', action: () => editor?.chain().focus().addColumnBefore().run() },
	{ label: 'Add column after', action: () => editor?.chain().focus().addColumnAfter().run() },
	{ label: 'Delete column', action: () => editor?.chain().focus().deleteColumn().run() },
	{ label: 'Add row before', action: () => editor?.chain().focus().addRowBefore().run() },
	{ label: 'Add row after', action: () => editor?.chain().focus().addRowAfter().run() },
	{ label: 'Delete row', action: () => editor?.chain().focus().deleteRow().run() },
	{ label: 'Delete table', action: () => editor?.chain().focus().deleteTable().run() },
	{ label: 'Merge cells', action: () => editor?.chain().focus().mergeCells().run() },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
		attributes: {
			class: `prose prose-sm m-5 focus:outline-none max-w-full [&_ol]:list-decimal [&_ol]:text-black [&_ul]:list-disc text-black [&_ul]:text-black [&_table]:border [&_table]:border-collapse [&_table]:w-full [&_th]:border [&_th]:border-gray-300 [&_th]:px-4 [&_th]:py-2 [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_tr:nth-child(even)]:bg-gray-100`,
		},
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
		<div className="flex items-center p-2 space-x-1">
			<button
				className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${editor?.isActive("bold") ? "is-active" : ""}`}
				onClick={() => editor?.chain().focus().toggleBold().run()}
			>
				<FaBold size={20} />
			</button>

			<button
				className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${editor?.isActive("italic") ? "is-active" : ""}`}
				onClick={() => editor?.chain().focus().toggleItalic().run()}
			>
				<FaItalic size={20} />
			</button>

			<button
				className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${editor?.isActive("strike") ? "is-active" : ""}`}
				onClick={() => editor?.chain().focus().toggleStrike().run()}
			>
				<FaStrikethrough size={20} />
			</button>

			<div className="relative">
				<button
					className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
					onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
				>
					<FaHeading size={20} />
					<FaAngleDown size={16} className="ml-1" />
				</button>

				{showHeadingDropdown && (
					<div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-40 z-10">
						{headingOptions.map((option, index) => (
						<button
							key={option}
							className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${editor?.isActive('heading', { level: index + 1 }) ? 'is-active' : ''}`}
							onClick={() =>
								editor?.chain().focus().toggleHeading({ level: index + 1 }).run()
							}
						>
							{option}
						</button>
						))}
					</div>
				)}
			</div>

			<button
				onClick={() => editor?.chain().focus().toggleBulletList().run()}
				className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${editor?.isActive('bulletList') ? 'is-active' : ''}`}
			>
				<FaListUl size={20} />
			</button>

			<button
				onClick={() => editor?.chain().focus().toggleOrderedList().run()}
				className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${editor?.isActive('orderedList') ? 'is-active' : ''}`}
			>
				<FaListOl size={20} />
			</button>

			<div className="relative">
			<button
				className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
				onClick={() => setShowTableDropdown(!showTableDropdown)}
			>
				<FaTable size={20} />
				<FaAngleDown size={16} className="ml-1" />
			</button>

			{showTableDropdown && (
				<div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-40 z-10">
				{tableOptions.map((option, index) => (
					<button
					key={index}
					className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
					onClick={option.action}
					>
					{option.label}
					</button>
				))}
				</div>
			)}
			</div>
		</div>

		<EditorContent editor={editor} />
	</div>
  )
}