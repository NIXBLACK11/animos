export type FolderStructure = {
    name: string;
    type: "folder" | "file";
    children?: FolderStructure[];
  };
  