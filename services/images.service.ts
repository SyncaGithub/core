import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import tinify from "tinify";

@Injectable()
export class ImagesService implements OnModuleInit {
	private logger = new Logger("ImagesService");
	private tinyPngService = tinify;

	constructor() {}

	onModuleInit() {
		this.tinyPngService.key = process.env.TINYPNG_API_KEY || "";
		this.tinyPngService.validate((err) => {
			if (err) throw err;
			this.logger.debug("pass validation");
			this.logger.debug(this.tinyPngService.compressionCount);
			// Validation of API key failed.
		});
	}

	async connect(key: string): Promise<void> {
		return new Promise((res, rej) => {
			this.tinyPngService.key = key;
			this.tinyPngService.validate((err) => {
				if (err) return rej(err);
				this.logger.debug("pass validation");
				this.logger.debug(this.tinyPngService.compressionCount);
				return res();
				// Validation of API key failed.
			});
		});
	}

	async compressImageFromUrl(
		imageUrl: string,
		imageName: string
	): Promise<string | void> {
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
		} catch (error) {
			return Promise.reject(error);
		}
	}
}