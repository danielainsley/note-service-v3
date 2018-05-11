import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchNoteComponent } from '../fetchnote/fetchnote.component';
import { NoteService } from '../../services/noteservice.service';

@Component({
    selector: 'createnote',
    templateUrl: './addnote.component.html'
})

export class AddNoteComponent implements OnInit {
    noteForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _noteService: NoteService, private _router: Router) {

        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.noteForm = this._fb.group({
            id: 0,
            text: ['', [Validators.required]],
            date: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        if (this.id > 0) {
            this.title = "Edit";
            this._noteService.getNoteById(this.id)
                .subscribe(resp => this.noteForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {
        if (!this.noteForm.valid) {
            return;
        }
        if (this.title == "Create") {
            this._noteService.saveNote(this.noteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-note']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            this._noteService.updateNote(this.noteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-note']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/fetch-note']);
    }

    get text() { return this.noteForm.get('text'); }
    get date() { return this.noteForm.get('date'); }
}