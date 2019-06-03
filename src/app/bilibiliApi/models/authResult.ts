export class AuthResult {
    public status: number;
    public token_info: AuthToken
    public cookie_info: any;
    public sso: Array<string>;
}

export class AuthToken {
    public mid: number;
    public access_token: string;
    public refresh_token: string;
    public expires_in: number;
}

export class RSAPublicKeyResult {
    public key: string;
    public hash: string;
}

export class SSOResult {
    public cookie: string;
    public status: string;
    public ts: number;
}