import {Injectable} from '@angular/core';
import {NoteModel} from '../models/note.model';
import {LocalStorageService} from 'ngx-localstorage';
import {NOTES} from './notes.mock';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
    private localStorageKey = 'notes';
    private ORIGINAL: NoteModel[] = NOTES;
    private DATABASE: NoteModel[] = NOTES;

    constructor(private storageService: LocalStorageService) {
      }

    private findNote(note: NoteModel): number {
          return this.DATABASE.findIndex((n: NoteModel) => n.id === note.id);
      }

    // CRUD operation
    public getNotes(): NoteModel[] {
        // Take from local storage, else take from memory
        const storage = this.getLocalStorage();
        this.DATABASE = (storage) ? storage : this.ORIGINAL;
        return this.DATABASE.sort((a: NoteModel, b: NoteModel) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }

    public addNote(note: NoteModel): void {
        const newNote: NoteModel = {
            id: new Date().getTime(),
            date: new Date(),
            content: note.content,
            authorName: note.authorName
        };

        this.DATABASE.unshift(newNote);
        this.setLocalStorage();
      }

    public deleteNote(note: NoteModel): void {
        if (this.DATABASE.length > 0) {
          const index = this.findNote(note);
          if (index > -1) {
            this.DATABASE.splice(index, 1);
            this.setLocalStorage();
          }
        }
      }

    public editNote(note: NoteModel): void {
        if (this.DATABASE.length > 0) {
          const index = this.findNote(note);
          if (index > -1) {
            this.DATABASE.splice(index, 1, note);
            this.setLocalStorage();
          }
        }
      }

    // Local storage
    private setLocalStorage(): void {
          this.storageService.set(this.localStorageKey, this.DATABASE);
      }

    private getLocalStorage(): NoteModel[] {
      return this.storageService.get(this.localStorageKey);
  }
}
