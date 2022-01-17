import { Utenti } from "../classes/Utenti";


export class JwtTokenResponse {

    token: string;
    utente:Utenti;

    constructor(token: string, utenti: Utenti) {
        this.token = token;
        this.utente = utenti;
    }

}