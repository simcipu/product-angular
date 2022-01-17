



export class Utenti {

    userId: string;
    password: string;
    attivo: string;
    ruoli:string[];

    constructor(userId: string, password: string,attivo: string,ruoli:[]) {
        this.userId = userId;
        this.password = password;
        this.attivo = attivo;
        this.ruoli = new Array<string>();
    }

}