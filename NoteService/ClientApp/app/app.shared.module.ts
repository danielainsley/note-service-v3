import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';

import { NoteService } from './services/noteservice.service' 
import { FetchNoteComponent } from './components/fetchnote/fetchnote.component'
import { AddNoteComponent } from './components/addnote/addnote.component'  

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchNoteComponent,
        AddNoteComponent

    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-note', component: FetchNoteComponent },
            { path: 'add-note', component: AddNoteComponent },
            { path: 'note/edit/:id', component: AddNoteComponent },  
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [NoteService]  
})
export class AppModuleShared {
}
