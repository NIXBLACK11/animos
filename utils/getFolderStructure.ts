import { FolderStructure } from "@/types/FolderStructure";

export const getFolderStructure = async (directoryHandle: FileSystemDirectoryHandle): Promise<FolderStructure> => {
    const structure: FolderStructure = {
      name: directoryHandle.name,
      type: "folder",
      children: [],
    };
  
    for await (const [name, handle] of directoryHandle.entries()) {
      if (handle.kind === "directory") {
        const subfolderStructure = await getFolderStructure(handle);
        structure.children?.push(subfolderStructure);
      } else if (handle.kind === "file") {
        structure.children?.push({
          name: handle.name,
          type: "file",
        });
      }
    }
  
    return structure;
  };