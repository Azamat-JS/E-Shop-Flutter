export declare class ImageKitService {
    private readonly imagekit;
    constructor();
    getAuthenticationParameters(): {
        token: string;
        expire: number;
        signature: string;
    };
}
