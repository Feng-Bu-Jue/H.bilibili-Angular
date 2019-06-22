export class UesrInfoResult {
    public birthday: string;
    public coins: number;
    public face: string;
    public fans_badge: boolean;
    public is_followed: boolean;
    public jointime: number;
    public level: number;
    public mid: number;
    public name: string;
    public rank: number;
    public sex: string;
    public sign: string;
    public top_photo: string;
    public theme: string;
    public vip: VIPMember;
}

export class VIPMember {
    public status: number;
    public theme_type: number;
    public type: number;
}