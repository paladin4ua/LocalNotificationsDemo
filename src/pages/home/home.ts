import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


declare var cordova : any;

class Notification {
  id: Number;
  title: string;
  text: string;
  data: any;
  at: Date;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onScheduleClick() {


    let notifications : Notification[] = [];

    for (let i = 0; i < 10; ++i) {

      let time = new Date();

      time.setSeconds(time.getSeconds() + 5);

      notifications.push({
        id: i,
        title: "Title " + i,
        text: "text " + i,
        data: { dummy : "some data"},
        at: time
      })
    }

    this.scheduleNotifications(notifications);

  }

  scheduleNotifications(notifications : Notification[]) {

    cordova.plugins.notification.local.clearAll((res) => {

      let notificationsDesc = notifications.map((notification) => {
        return {
          id: notification.id,
          title: notification.title,
          text: notification.text,
          data: notification.data,
          trigger: { at: notification.at }
        }
      });

      cordova.plugins.notification.local.schedule(notificationsDesc);
    });

  }




}
