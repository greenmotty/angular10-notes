export class NoteModel {
  public id?: number;
  public authorName: string;
  public content: string;
  public date: Date = new Date();

  constructor() {
  }
}
