import AWS from 'aws-sdk';
import { FileUpload } from '@/types';

const B2 = new AWS.S3({
  endpoint: process.env.BACKBLAZE_ENDPOINT,
  accessKeyId: process.env.BACKBLAZE_ACCESS_KEY_ID,
  secretAccessKey: process.env.BACKBLAZE_SECRET_ACCESS_KEY,
  region: 'us-east-1', // Backblaze B2 uses us-east-1
  signatureVersion: 'v4',
});

const BUCKET_NAME = process.env.BACKBLAZE_BUCKET_NAME!;

export class BackblazeService {
  /**
   * Upload a file to Backblaze B2
   */
  static async uploadFile(
    buffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<FileUpload> {
    const fileKey = `uploads/${Date.now()}-${fileName}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: mimeType,
      ACL: 'private', // Ensure files are private
    };

    try {
      const result = await B2.upload(params).promise();
      
      return {
        fileKey,
        fileName,
        mimeType,
        size: buffer.length,
        url: result.Location!,
      };
    } catch (error) {
      console.error('Error uploading to Backblaze:', error);
      throw new Error('Failed to upload file');
    }
  }

  /**
   * Generate a signed URL for private file access
   */
  static async getSignedUrl(fileKey: string, expiresIn = 3600): Promise<string> {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Expires: expiresIn,
    };

    try {
      return await new Promise((resolve, reject) => {
        B2.getSignedUrl('getObject', params, (err, url) => {
          if (err) reject(err);
          else resolve(url!);
        });
      });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw new Error('Failed to generate signed URL');
    }
  }

  /**
   * Delete a file from Backblaze B2
   */
  static async deleteFile(fileKey: string): Promise<void> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
    };

    try {
      await B2.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting from Backblaze:', error);
      throw new Error('Failed to delete file');
    }
  }

  /**
   * Get file metadata
   */
  static async getFileMetadata(fileKey: string) {
    const params: AWS.S3.HeadObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
    };

    try {
      return await B2.headObject(params).promise();
    } catch (error) {
      console.error('Error getting file metadata:', error);
      throw new Error('Failed to get file metadata');
    }
  }

  /**
   * List files in a directory
   */
  static async listFiles(prefix = 'uploads/') {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    };

    try {
      return await B2.listObjectsV2(params).promise();
    } catch (error) {
      console.error('Error listing files:', error);
      throw new Error('Failed to list files');
    }
  }
}
