import { Md5 } from "ts-md5";
import { error } from 'util';

export class SignHelper {

    static md5Sign(signString: string): string;
    static md5Sign(param: { [name: string]: any }, specialHandle: (signString: string) => string): string;

    //这种写法是真的蠢 ts设计者怎么想的
    static md5Sign(): string {
        if (this.arguments.length > 0) {
            let signString: string;
            if (typeof this.arguments[0] == "string") {
                signString = this.arguments[0];
            }
            else {
                this.md5Sign(this.generateSignString(this.arguments[0], this.arguments[1]));
            }
        }
        throw new error("not support");
    }

    static generateSignString(param: { [name: string]: any }, specialHandle: (signString: string) => string = null): string {
        let signString = Object.keys(param)
            .sort()
            .map(key => param[key])
            .filter(value => value.length > 0)
            .join("&")

        if (signString)
            specialHandle(signString);

        return signString;
    }
}