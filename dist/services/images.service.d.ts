import { OnModuleInit } from "@nestjs/common";
export declare class ImagesService implements OnModuleInit {
    private logger;
    private tinyPngService;
    constructor();
    onModuleInit(): void;
    connect(key: string): Promise<void>;
    compressImageFromUrl(imageUrl: string, imageName: string): Promise<string | void>;
}
//# sourceMappingURL=images.service.d.ts.map