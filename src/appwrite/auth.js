import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    Client = new Client()
    Account;

    constructor() {

        

        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.Account = new Account(this.Client)
    }

    async sendVerification() {
        try {

            return await this.Account.createVerification({
                url: `${window.location.origin}/verify-email`
            })
        } catch (error) {


            throw error


        }
    }


    async verifyEmail({ userId, secret }) {
        try {

            return await this.Account.updateVerification({
                userId,
                secret
            })

        } catch (error) {


            return false


        }

    }



    async CreateAccount({ email, password, name }) {

        try {
            const userAccount = await this.Account.create(ID.unique(), email, password, name)

            return userAccount

        } catch (error) {

            throw error
        }

    }


    async login({ email, password }) {

        try {

            return await this.Account.createEmailPasswordSession({ email, password })

        } catch (error) {

            throw error
        }
    }

    async getCurrentUser() {

        try {

            return await this.Account.get()

        } catch (error) {

            return null

        }

        return null
    }


    async logout() {

        try {

            return await this.Account.deleteSession("current")

        } catch (error) {

            throw error
        }
    }


    async sendPasswordRecovery(email) {

        try {

            return await this.Account.createRecovery({
                email,
                url: `${window.location.origin}/reset-password`
            })

        } catch (error) {


            throw error

        }

    }

    async resetPassword({ userId, secret, password }) {

        try {

            return await this.Account.updateRecovery({
                userId,
                secret,
                password
            })

        } catch (error) {



            throw error

        }

    }


}





const authService = new AuthService()

export default authService