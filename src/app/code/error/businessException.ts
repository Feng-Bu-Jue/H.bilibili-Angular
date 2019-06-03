export class BusinessError implements Error {

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
    
    name: string;
    stack?: string;
    public code: number;
    public message: string;
}