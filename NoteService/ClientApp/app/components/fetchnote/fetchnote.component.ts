import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteService } from '../../services/noteservice.service'

@Component({
    selector: 'fetchnote',
    templateUrl: './fetchnote.component.html'
})

export class FetchNoteComponent {
    public noteList: NoteData[];

    constructor(public http: Http, private _router: Router, private _noteService: NoteService) {
        this.getNotes();
    }

    getNotes() {
        this._noteService.getNotes().subscribe(
            data => this.noteList = data
        )
    }

    delete(noteID) {
        var ans = confirm("Do you want to delete note with Id: " + noteID);
        if (ans) {
            this._noteService.deleteNote(noteID).subscribe((data) => {
                this.getNotes();
            }, error => console.error(error))
        }
    }
}
interface NoteData {
    id: number;
    text: string;
    date: Date;
}