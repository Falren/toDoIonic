import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from '../../api/task';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent implements OnInit {
  active: Boolean = true;
  tasks: any = [];

  constructor(private taskAPI: Task, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getTasks(true);
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent
    })
    await modal.present();
    modal.onDidDismiss().then(result => {
      if (result.data) this.taskAPI.create(result.data).subscribe((data) => {
        this.onCreateTask(data) 
      },
      () => { this.taskAPI.presentToast() 
      });
    })
  }

  getTasks(active) {
    this.taskAPI.query({ active: active }).subscribe((data) => { this.tasks = data; });
  }

  onCreateTask(task) {
    this.tasks.unshift(task);
  }

  onDeleteTask(task) {
      this.tasks = this.tasks.filter((item) => this.deleteTask(item, task));
  }

  deleteTask(item, task) {
    return item.id != task.id
  }

  onCompleteTask(task) {
      this.tasks = this.tasks.filter((item) => this.deleteTask(item, task));
  }
}
