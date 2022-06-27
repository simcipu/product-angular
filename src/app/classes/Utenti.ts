



export class Utenti {

    id:string;
    userId: string;
    password: string;
    attivo: string;
    ruoli:string[];

    constructor(id:string,userId: string, password: string,attivo: string,ruoli:[]) {
        this.id=id;
        this.userId = userId;
        this.password = password;
        this.attivo = attivo;
        this.ruoli = new Array<string>();
    }

}