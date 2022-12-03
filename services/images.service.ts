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
			this.logger.debug(
				`[Compression Service] Successfully connected to the server and retrieve access. Amount of compression used this month: ${this.tinyPngService.compressionCount}`
			);
			// Validation of API key failed.
		});
	}

	async connect(key: string): Promise<void> {
		return new Promise((res, rej) => {
			this.tinyPngService.key = key;
			this.tinyPngService.validate((err) => {
				if (err) return rej(err);
				this.logger.debug(
					`[Compression Service] Successfully connected to the server and retrieve access. Amount of compression used this month: ${this.tinyPngService.compressionCount}`
				);
				return res();
				// Validation of API key failed.
			});
		});
	}

	async compressImageFromUrl(
		AWS_S3_KEY_ID: string,
		AWS_S3_KEY: string,
		imageUrl: string,
		imageName: string,
		clientId: string
	): Promise<string | void> {
		try {
			const compressedSource = this.tinyPngService.fromUrl(imageUrl);
			const result = compressedSource
				.convert({ type: "image/jpeg" })
				.store({
					service: "s3",
					aws_access_key_id: AWS_S3_KEY_ID,
					aws_secret_access_key: AWS_S3_KEY,
					region: "eu-central-1",
					headers: {
						// "Cache-Control": "public, max-age=31536000", //Make images delete automatic after the specified period
					},
					path: `synca-bucket/clients/${clientId}/products/${encodeURIComponent(
						imageName
					)}.jpeg`,
				});
			const location = await result.location();
			return Promise.resolve(await location);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
