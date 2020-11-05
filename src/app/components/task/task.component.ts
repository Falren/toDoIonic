import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Task } from '../../api';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})

export class TaskComponent {
  @Input() task: any = {};
  @Output() onDeleteTask = new EventEmitter<any>();
  @Output() onCompleteTask = new EventEmitter<any>();
  
  constructor(
    private taskAPI: Task,
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public toastController: ToastController
    ) {}

  async deleteTask(task: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure',
      message: 'you want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary', 
        }, {
          text: 'Okay',
          handler: () => { 
            this.taskAPI.delete(task.id).subscribe((data)=> {
              this.onDeleteTask.emit(data);
            },
            () => { this.taskAPI.presentToast(); }
            );
          }
        }
      ]
    });
    alert.present();
  }

  completeTask(taskId: number, active) {
    this.taskAPI.update(taskId, {active: active}).subscribe((data) => { this.onCompleteTask.emit(data); });
  }

  async showModal(task: any) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task }
    })
    await modal.present();
    modal.onDidDismiss().then(result => {
      if (result.data) this.taskAPI.update(task.id, result.data).subscribe((data) => { this.task = data });
    })
  }
}
