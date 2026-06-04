import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite"

export class bucketServices {
   Client = new Client()
   bucket;
   constructor() {
      this.Client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId)
      this.bucket = new Storage(this.Client)
   }

   async uploadFile(file) {
      try {
         return await this.bucket.createFile({
            bucketId: conf.appwriteBucketId,
            fileId: ID.unique(),
            file: file
         })


      } catch (error) {


         return false
      }

   }

   async deleteFile(fileId) {
      try {

         return await this.bucket.deleteFile({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
         })


      } catch (error) {

         return false
      }
   }

   filePreview(fileId) {

      return this.bucket.getFileView(
         conf.appwriteBucketId,
         fileId,


      )

   }


}

const bucketservices = new bucketServices()

export default bucketservices




