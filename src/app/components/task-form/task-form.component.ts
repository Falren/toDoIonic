import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  @Input() task: any = {};
  
  constructor(private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task.title || '', Validators.required],
      description: [this.task.description || '', Validators.required]
    });
  }

  async close() {
    this.modalCtrl.dismiss();
  }

  async onSubmit() {
    this.modalCtrl.dismiss(this.taskForm.value);
  }
}
