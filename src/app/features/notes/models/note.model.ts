export class NoteModel {
  public id?: string;
  public authorName: string;
  public content: string;
  public date: Date = new Date();

  constructor() {
  }
}
