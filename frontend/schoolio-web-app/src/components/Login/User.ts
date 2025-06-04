import {NoteDTO} from "../Note/NoteDTO";

export class User {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    favoriteNotes: NoteDTO[];

    constructor(id: number, firstName: string, lastName: string, email: string, favoriteNotes: NoteDTO[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.favoriteNotes = favoriteNotes;
    }
}