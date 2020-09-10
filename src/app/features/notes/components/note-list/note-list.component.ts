import {Component, OnInit} from '@angular/core';
import {NoteModel} from '../../models/note.model';
import {MatDialog} from '@angular/material/dialog';
import {NoteModalComponent} from '../note-modal/note-modal.component';
import {UserService} from '../../../authentication/services/user.service';
import {NoteService} from '../../services/note.service';
import {ActionModel} from '../../models/action.model';
import {LocalStorageService} from 'ngx-localstorage';
import {Actions} from '../../enums/actions.enum';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  public notes: NoteModel[];
  public note: NoteModel;

  constructor(private noteService: NoteService,
              private userService: UserService,
              private storageService: LocalStorageService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getNotes();
  }

  // CRUD operations
  private getNotes(): void {
    this.notes = this.noteService.getNotes();
  }

  private addNote(note: NoteModel): void {
    this.noteService.addNote(note);
    this.getNotes();
  }

  private editNote(note: NoteModel): void {
    this.noteService.editNote(note);
    this.getNotes();
  }

  private deleteNote(note: NoteModel): void {
    this.noteService.deleteNote(note);
    this.getNotes();
  }

  public openDialog(note?: NoteModel): void {
    const dialogRef = this.dialog.open(NoteModalComponent, {
      width: '40vw',
      data: {
        note
      }
    });

    dialogRef.afterClosed().subscribe((result: ActionModel) => {
      if (!result?.action) {
        return;
      }
      const functionsMap = {
        [Actions.Add]: this.addNote.bind(this),
        [Actions.Edit]: this.editNote.bind(this),
        [Actions.Delete]: this.deleteNote.bind(this)
      };
      functionsMap[result.action](result.note);
    });
  }

  public logout(): void {
    this.userService.logoutUser();
  }


  public trackByFn(index, item: NoteModel): number {
    // Date is unique
    return item.date;
  }
}
