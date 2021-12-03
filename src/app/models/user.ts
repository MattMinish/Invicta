export class User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;

    constructor(userObj: { uid: string; email: string; photoURL: string; displayName: string; }) {
        this.uid = userObj.uid;
        this.email = userObj.email;
        this.photoURL = userObj.photoURL;
        this.displayName = userObj.displayName;
    }
}
