export default class userModel {
     name!:string
     id!:number
    username!:string
    email!:string

    constructor(name:string ,id:number,username:string,email:string) {
        this.id=id;
        this.name=name;
        this.username=username;
        this.email=email;
    }
}

