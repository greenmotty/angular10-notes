import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteModel} from '../../models/note.model';
import {ActionModel} from '../../models/action.model';
import {Actions} from '../../enums/actions.enum';

@Component({
  selector: 'app-note-modal',
  styleUrls: ['note-modal.component.scss'],
  templateUrl: './note-modal.component.html'
})
export class NoteModalComponent implements OnInit {
  public formGroup: FormGroup;
  public note: NoteModel = new NoteModel();
  public isEdit = false;

  public get actions(): typeof Actions {
    return Actions;
  }

  get authorName(): AbstractControl {
    return this.formGroup.get('authorName');
  }

  get content(): AbstractControl {
    return this.formGroup.get('content');
  }

  constructor(
    public dialogRef: MatDialogRef<NoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.initForm();
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      authorName: [null, [
          Validators.required,
          Validators.maxLength(50)
      ]],
      content: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000)]]
    });
  }

  private initForm(): void {
    this.isEdit = (this.data && this.data.note?.id) ? true : false;
    if (this.isEdit) {
      this.note = this.data.note;
      this.formGroup.patchValue({
        authorName: this.data.note?.authorName,
        content: this.data.note?.content
      });
    }
  }

  onClick(action): void {
    const note = new NoteModel();
    note.id = (this.isEdit) ? this.note.id : null;
    note.authorName = this.formGroup.controls.authorName.value;
    note.content = this.formGroup.controls.content.value;
    this.dialogRef.close({action, note} as ActionModel);
  }
}
