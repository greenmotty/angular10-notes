import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotesRoutingModule} from './notes-routing.module';
import {NoteListComponent} from './components/note-list/note-list.component';
import {NoteModalComponent} from './components/note-modal/note-modal.component';
import {NoteElementComponent} from './components/note-element/note-element.component';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    NoteListComponent,
    NoteModalComponent,
    NoteElementComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NotesModule { }
