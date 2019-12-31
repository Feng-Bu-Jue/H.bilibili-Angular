import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApi } from 'src/app/bilibiliApi/userApi';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ModalService } from 'src/app/services/modalService';
import { ImgViewer } from 'src/app/widgets/img-viewer/img-viewer';

@Component({
  selector: "page-me-favorites",
  templateUrl: './me-favorites.html',
  styleUrls: ['./me-favorites.scss']
})
export class MineFavoritesPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public data = [];
  public pageNum: number = 0;

  constructor(
    private userApi: UserApi,
    private modalService: ModalService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  public async loadData(event = null) {
    var res = await this.userApi.getMyFav(this.pageNum, 30)
    this.pageNum++;
    this.data = this.data.concat(res.list);

    if (event)
      event.target.complete();
    if (this.pageNum >= res.pageinfo.totalpage || this.pageNum >= 100)
      this.infiniteScroll.disabled = true;
  }

  public async popUpImgViewer(index: number): Promise<void> {
    let modal = await this.modalController.create(this.modalService.fromDefaultOption({
      component: ImgViewer,
      componentProps: {
        urls: this.data[index].content.item.pictures.map(x => x.img_src),
        currentIndex: 0,
      }
    }))
    await modal.present();
  }
}
