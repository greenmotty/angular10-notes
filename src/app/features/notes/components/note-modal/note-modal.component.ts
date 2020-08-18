import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteModel} from '../../models/note.model';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html'
})
export class NoteModalComponent implements OnInit {
  public formGroup: FormGroup;
  public note: NoteModel = new NoteModel();
  public isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<NoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {}

  onSubmit(note: NoteModel): void {
    this.dialogRef.close(note);
  }

  ngOnInit(): void {
    this.createForm();
    this.isEdit = (this.data.note?.id) ? true : false;

    if (this.data) {
      this.note = this.data.note;
      this.formGroup.patchValue({
        authorName: this.data.note?.authorName,
        content: this.data.note?.content
      });
    }
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      authorName: [null, Validators.required],
      content: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000)]]
    });
  }

  onClick(action): void {
    const note = new NoteModel();
    note.id = (this.isEdit) ? this.note.id : null;
    note.authorName = this.formGroup.controls.authorName.value;
    note.content = this.formGroup.controls.content.value;
    this.dialogRef.close({action , value: note});
  }
}
