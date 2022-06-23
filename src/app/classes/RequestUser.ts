import { Utenti } from "../classes/Utenti";


export class RequestUser {

    adminUser: string;
    adminPassword: string;
    utente:Utenti;

    constructor(adminPassword: string,adminUser: string, utenti: Utenti) {
        this.adminUser = adminUser;
        this.utente = utenti;
        this.adminPassword = adminPassword;
    }

}