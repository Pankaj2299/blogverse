import conf from "../conf/conf";
import { Client, ID, TablesDB, Query } from "appwrite"

export class dbServices {

    client = new Client()
    tablesdb;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.tablesdb = new TablesDB(this.client)

    }

    async createPost({ title, slug, content, featuredImage, status, userId, authorName }) {

        try {

            return await this.tablesdb.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: { title, content, featuredImage, status, userId, authorName, slug}
            })


        }

        catch (error) {
            
            return false
        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {

            return await this.tablesdb.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                { title, content, featuredImage, status,slug }
            )



        } catch (error) {

            
            return false
            

        }
    }


    async deletePost(slug) {

        try {

            await this.tablesdb.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )

            return true

        } catch (error) {

            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesdb.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug

            )

        } catch (error) {

            return false
        }
    }

    async listPost(queries = [Query.equal("status", "active")]) {
        try {

            return await this.tablesdb.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                // [
                //     Query.equal("status","active")
                // ]
                queries

            )

        } catch (error) {

            return false
        }

    }

}



const dbservices = new dbServices()
export default dbservices



