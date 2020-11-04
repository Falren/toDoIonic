import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { on } from 'process';
import { Task } from '../../api/task';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  active: Boolean = true;
  activeTasks: any = [];
  completedTasks: any = [];

  constructor(private taskAPI: Task, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getTasks(true);
    this.getTasks(false);
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent
    })
    await modal.present();
    modal.onDidDismiss().then(result => {
      this.taskAPI.create(result.data).subscribe((data) => {
        this.onCreateTask(data)
      })
    })
  }

  segmentChanged(ev: any) {
    ev.detail.value == 'active' ? this.active = true : this.active = !this.active
  }

  getTasks(active) {
    this.taskAPI.query({ active: active }).subscribe((data) => {
      this[this.taskListName(active)] = data;
    });
  }

  taskListName(active) {
    const taskList = active ? 'activeTasks' : 'completedTasks';
    return taskList;
  }

  onCreateTask(task) {
    this.activeTasks.unshift(task)
  }

  onDeleteTask(task) {
    if (task.active) {
      this.activeTasks = this.activeTasks.filter((item) => this.deleteTask(item, task));
    } else {
      this.completedTasks = this.completedTasks.filter((item) => this.deleteTask(item, task));
    }
  }

  deleteTask(item, task) {
    return item.id != task.id
  }

  onCompleteTask(task) {
    if (task.active) {
      this.completedTasks = this.completedTasks.filter((item) => { return item.id != task.id });
      this.activeTasks.unshift(task)
    } else {
      this.activeTasks = this.activeTasks.filter((item) => { return item.id != task.id });
      this.completedTasks.unshift(task)
    }
  }
}
