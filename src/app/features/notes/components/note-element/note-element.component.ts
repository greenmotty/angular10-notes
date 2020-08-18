import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteModel} from '../../models/note.model';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.scss']
})
export class NoteElementComponent implements OnInit {
  @Input() note?: NoteModel;
  @Output() action: EventEmitter<NoteModel> = new EventEmitter();

  public title: string;

  constructor() { }

  ngOnInit(): void {
    if (this.note) {
      this.title = this.note.authorName;
    } else {
      this.title = 'Add new note';
    }
  }

  public onClick(note: NoteModel): void {
    this.action.emit(note);
  }
}
