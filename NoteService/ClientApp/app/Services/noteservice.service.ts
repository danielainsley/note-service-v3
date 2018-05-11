import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class NoteService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getNotes() {
        return this._http.get(this.myAppUrl + 'api/Notes/Index')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getNoteById(id: number) {
        return this._http.get(this.myAppUrl + "api/Notes/Details/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveNote(note) {
        return this._http.post(this.myAppUrl + 'api/Notes/Create', note)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateNote(note) {
        return this._http.put(this.myAppUrl + 'api/Notes/Edit', note)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteNote(id) {
        return this._http.delete(this.myAppUrl + "api/Notes/Delete/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}