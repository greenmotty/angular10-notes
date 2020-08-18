import { NoteModel } from './note.model';

describe('Note', () => {
  it('should create an instance', () => {
    expect(new NoteModel()).toBeTruthy();
  });
});
