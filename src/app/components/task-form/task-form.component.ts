import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../api';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  @Input() task: any = {};
  
  constructor(private fb: FormBuilder, private taskAPI: Task, private router: Router, private modalCtrl: ModalController) { }

  
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task.title || '', Validators.required],
      description: [this.task.description || '', Validators.required]
    })
  }

  async close() {
    this.taskForm.value.id ? await this.modalCtrl.dismiss(this.taskForm.value) : await this.modalCtrl.dismiss()

  }

  async onSubmit() {
    await this.modalCtrl.dismiss(this.taskForm.value);
  }
}
