import { OnModuleInit } from "@nestjs/common";
export declare class ImagesService implements OnModuleInit {
    private logger;
    private tinyPngService;
    constructor();
    onModuleInit(): void;
    connect(key: string): Promise<void>;
    compressImageFromUrl(AWS_S3_KEY_ID: string, AWS_S3_KEY: string, imageUrl: string, imageName: string, clientId: string): Promise<string | void>;
}
//# sourceMappingURL=images.service.d.ts.map