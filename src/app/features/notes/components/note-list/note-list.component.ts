import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {NoteModel} from '../../models/note.model';
import {MatDialog} from '@angular/material/dialog';
import {NoteModalComponent} from '../note-modal/note-modal.component';
import {UserService} from '../../../authentication/services/user.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  constructor(private noteService: NoteService,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog) {}

  public notes: NoteModel[];
  public note: NoteModel;

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

  public openDialog(note?: NoteModel): void {
    const dialogRef = this.dialog.open(NoteModalComponent, {
      width: '400px',
      data: {
        note
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.action === 'add'){
        this.noteService.addNote(result.value);
      } else if (result.action === 'edit'){
        this.noteService.editNote(result.value);
      } else if (result.action === 'delete'){
        this.noteService.deleteNote(result.value);
      }

      this.notes = this.noteService.getNotes();
    });
  }

  logout(): void {
    this.userService.logoutUser();

  }
}
