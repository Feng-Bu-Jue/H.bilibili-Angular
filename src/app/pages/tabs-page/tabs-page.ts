import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, MenuController, ActionSheetController, AlertController, Platform, Events, IonTabs } from '@ionic/angular';

@Component({
  templateUrl: 'tabs-page.html',
  styleUrls: ['tabs-page.scss']
})
export class TabsPage implements OnInit {

  @ViewChild('tabs') tabs: IonTabs;
  tabsCanGoBack = false;
  tabsParentCanGoBack = false;

  constructor(public platform: Platform,
    public events: Events,
    public router: Router,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.androidBackButtonHandle();
    });
  }

  async androidBackButtonHandle() {
    const alert = await this.alertCtrl.getTop();
    if (alert) {
      alert.dismiss();
      return;
    }
    const action = await this.actionSheetCtrl.getTop();
    if (action) {
      action.dismiss();
      return;
    }
    const popover = await this.popoverCtrl.getTop();
    if (popover) {
      popover.dismiss();
      return;
    }
    const modal = await this.modalCtrl.getTop();
    if (modal) {
      modal.dismiss();
      return;
    }
    const isOpen = await this.menuCtrl.isOpen();
    if (isOpen) {
      this.menuCtrl.close();
      return;
    }
    /*
    if (!this.tabs.outlet.parentOutlet.canGoBack() && !this.tabs.outlet.canGoBack()) {
      //this.native.appMinimize();
      return;
    }
    */
  }

  onTabClick(path: string) {
    //this.router.navigateByUrl(`app/tabs/${path}`)
  }
}
