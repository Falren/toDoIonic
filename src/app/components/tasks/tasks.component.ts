import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
  foundTasks: any = []; 
  search: string;
  searchBar: Boolean = false;
  taskNotFound: Boolean = false;

  constructor(
    private taskAPI: Task,
    private modalCtrl: ModalController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.getTasks(true);
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ionChange(input) {
    if (input === "" ) {
      this.foundTasks = [];
      this.taskNotFound = false;
    } else {
      this.taskAPI.query({ query: input }).subscribe((data) => {
        this.foundTasks = data
        this.taskNotFound = !this.foundTasks.length;
      });
    }
  }

  isSearchBar() {
    this.search = "";
    this.foundTasks = []; 
    this.searchBar = !this.searchBar;
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
      () => { this.showToast('Task has been successfully created!') });
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
    this.foundTasks = this.foundTasks.filter((item) => this.deleteTask(item, task));
    this.showToast('Task has been deleted');
  }

  deleteTask(item, task) {
    return item.id != task.id
  }

  onCompleteTask(task) {
    this.foundTasks = this.foundTasks.filter((item) => this.deleteTask(item, task))
    this.foundTasks.unshift(task)
    this.tasks = this.tasks.filter((item) => this.deleteTask(item, task));
    this.showToast(task.active ? 'Task has been undone' : 'Task has been completed');
  }
}
