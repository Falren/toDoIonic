import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable()
export class Task {
  constructor(private http: HttpClient, public toastController: ToastController) {}

  async showError() {
    const toast = await this.toastController.create({
      message: 'Something went wrong',
      duration: 2000
    });
    toast.present();
  }

  async showTaskDeleted(){
    const toast = await this.toastController.create({
      message: 'Task has been deleted!',
      duration: 2000
    });
    toast.present();
  }

  async showStatusChanged(task) {
    if (!task.active) {
      const toast = await this.toastController.create({
        message: 'Task has been completed!',
        duration: 2000
      });
      toast.present();
    } else if (task.active) {
      const toast = await this.toastController.create({
        message: 'Task has been undone!',
        duration: 2000
      });
      toast.present();
    } 
  }

  query(params?) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/tasks`, { params: params });
  }

  create(params?) {
    return this.http.post(`${environment.apiEndpoint}/api/v1/tasks`, params);
  }

  update(id?, params?) {
    return this.http.put(`${environment.apiEndpoint}/api/v1/tasks/${id}`, params);
  }

  delete(id) {
    return this.http.delete(`${environment.apiEndpoint}/api/v1/tasks/${id}`);
  }

  get(id) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/tasks/${id}`);
  }
}
