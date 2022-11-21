"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const tinify_1 = __importDefault(require("tinify"));
let ImagesService = class ImagesService {
    constructor() {
        this.logger = new common_1.Logger("ImagesService");
        this.tinyPngService = tinify_1.default;
    }
    onModuleInit() {
        this.tinyPngService.key = process.env.TINYPNG_API_KEY || "";
        this.tinyPngService.validate((err) => {
            if (err)
                throw err;
            this.logger.debug("pass validation");
            this.logger.debug(this.tinyPngService.compressionCount);
            // Validation of API key failed.
        });
    }
    async connect(key) {
        return new Promise((res, rej) => {
            this.tinyPngService.key = key;
            this.tinyPngService.validate((err) => {
                if (err)
                    return rej(err);
                this.logger.debug("pass validation");
                this.logger.debug(this.tinyPngService.compressionCount);
                return res();
                // Validation of API key failed.
            });
        });
    }
    async compressImageFromUrl(imageUrl, imageName) {
        try {
            const compressedSource = this.tinyPngService.fromUrl(imageUrl);
            this.logger.debug("got soruce object");
            const result = compressedSource.store({
                service: "s3",
                aws_access_key_id: process.env.AWS_S3_KEY_ID,
                aws_secret_access_key: process.env.AWS_S3_KEY,
                region: "eu-central-1",
                headers: {
                    "Cache-Control": "public, max-age=31536000",
                },
                path: "synca-bucket/products/" + imageName,
            });
            const location = await result.location();
            this.logger.debug("got result: " + location);
            return Promise.resolve(await location);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map