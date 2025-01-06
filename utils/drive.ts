import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

export async function uploadFileToDrive(accessToken: string, file: File) {
    // First, get upload URL
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/drive',
      });
      const service = google.drive({version: 'v3', auth});
      const requestBody = {
        name: 'photo.jpg',
        fields: 'id',
      };
      const media = {
        mimeType: 'image/jpeg',
        body: file,
      };
      try {
        const file = await service.files.create({
          requestBody,
          media: media,
        });
        console.log('File Id:', file.data.id);
        return file.data.id;
      } catch (err) {
        // TODO(developer) - Handle error
        throw err;
      }
  }