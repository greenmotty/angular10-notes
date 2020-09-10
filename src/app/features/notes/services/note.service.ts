import {Injectable} from '@angular/core';
import {NoteModel} from '../models/note.model';
import {LocalStorageService} from 'ngx-localstorage';
import {MockDatabaseService} from './mock-database.service';
import {RandomService} from '../../../shared/services/random.service';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private localStorageKey = 'notes';
    private originalMock: NoteModel[] = this.mockDatabaseService.NOTES;
    private databaseMock: NoteModel[];

    constructor(private storageService: LocalStorageService,
                private mockDatabaseService: MockDatabaseService,
                private randomService: RandomService) {}

    private findNote(note: NoteModel): number {
          return this.databaseMock.findIndex((n: NoteModel) => n.id === note.id);
      }

    // CRUD operation
    public getNotes(): NoteModel[] {
        // Take from local storage, else take from memory
        const storage = this.getLocalStorage();
        this.databaseMock = (storage) ? storage : this.originalMock;
        this.databaseMock = this.databaseMock.sort(({date: aDate}, {date: bDate}) => {
            return bDate - aDate;
        });
        this.setLocalStorage();
        return this.databaseMock;
    }

    public addNote(note: NoteModel): void {
        const newNote = new NoteModel();
        newNote.id = this.randomService.getRandomNumber(100, 1000);
        newNote.content = note.content;
        newNote.authorName = note.authorName;
        this.databaseMock.unshift(newNote);
        this.setLocalStorage();
    }

    public deleteNote(note: NoteModel): void {
        if (this.databaseMock.length) {
            const index = this.findNote(note);
            if (index > -1) {
                this.databaseMock.splice(index, 1);
                this.setLocalStorage();
            }
        }
    }

    public editNote(note: NoteModel): void {
        if (this.databaseMock.length) {
            const index = this.findNote(note);
            if (index > -1) {
                this.databaseMock.splice(index, 1, note);
                this.setLocalStorage();
            }
        }
    }

    // Local storage
    private setLocalStorage(): void {
        this.storageService.set(this.localStorageKey, this.databaseMock);
    }

    private getLocalStorage(): NoteModel[] {
        return this.storageService.get(this.localStorageKey);
    }
}
