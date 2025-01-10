// 'use client';

// import { useSession } from 'next-auth/react';
// import { ChangeEvent } from 'react';
// import { uploadFileToDrive } from '@/utils/drive';

// export default function DriveUploader() {
//   const { data: session } = useSession();

//   const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
//     console.log("1");
//     const file = event.target.files?.[0]; // Use optional chaining in case files is null
//     if (!file) {
//       console.log("File not available!");
//       return;
//     }
//     console.log(session);
//     if (!session?.access_token) {
//       console.log("Access token not available");
//       return;
//     }

//     try {
//       const result = await uploadFileToDrive(session.access_token, file);
//       console.log('File uploaded:', result);
//     } catch (error) {
//       console.error('Upload failed:', error);
//     }
//   };

//   return (
//     <div>
//       <input 
//         type="file" 
//         onChange={handleFileUpload}
//       />
//     </div>
//   );
// }
