export class Picture {
  public img_height: number;
  public img_size: number;
  public img_width: number;
  public img_src: string;
}


export class LinkDrawItem {
  public already_liked: number;
  public already_voted: number;
  public category: string;
  public doc_id: number;
  public poster_uid: number;
  public title: string;
  public description:string;
  public upload_time: number;
  public upload_timestamp:number;
  public view_count:number;
  public pictures: Array<Picture>;
}

export class LinkDrawUesr {
  public head_url: string;
  public name: string;
  public uid: number;
}

export class LinkDrawResult {
  public item: LinkDrawItem;
  public user: LinkDrawUesr;
}

export class LinkDrawResultList {
  public total_count: number;
  public items: LinkDrawResult[];
}

//* v1 */
export class LinkDrawResultV1 {
  public count: number;
  public ctime: number;
  public description: number;
  public doc_id: number;
  public like: number;
  public pictures: number;
  public poster_uid: number;
  public title: number;
  public view: number;
}

export class LinkDrawResultV1List {
  public items: Array<LinkDrawResultV1>;
}