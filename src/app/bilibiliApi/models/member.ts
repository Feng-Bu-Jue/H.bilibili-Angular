export class Member {
    public mid:string;
    public avatar: string;
    public uname: string;
    public sign: string;
    public sex: string;
    public rank: number;
    public level_info: MemberLevel;
    public vip: MemberVip;
}

export class MemberLevel {
    public current_level: number;
}
export class MemberVip {
    public vipStatus: number;
    public vipType: number;
}