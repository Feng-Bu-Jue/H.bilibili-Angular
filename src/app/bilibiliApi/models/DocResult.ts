export class Picture {
  public img_height: number;
  public img_size: number;
  public img_width: number;
  public img_src: string;
}


export class DocItem {
  public already_liked: number;
  public already_voted: number;
  public category: string;
  public doc_id:number;
  public poster_uid: number;
  public title: string;
  public upload_time: number;
  public pictures: Array<Picture>;
}

export class DocUesr {
  public head_url: string;
  public name: string;
  public uid: number;
}

export class DocResult {
  public item: DocItem;
  public user: DocUesr;
}

export class DocResultList{
  public total_count: number;
  public items: DocResult[];
}
