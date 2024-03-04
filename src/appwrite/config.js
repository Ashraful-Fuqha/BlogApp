import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client()
    databases
    storage

    constructor(){
        this.client
         .setEndpoint(conf.appwriteURL)
         .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service error: " + error)
        }
    }

    async updatePost(slug, {title, content, status, featuredImage}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //File upload

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketID,
            // console.log(fileId),
            [fileId]
        )
    }
}

const service = new Service()
export default service