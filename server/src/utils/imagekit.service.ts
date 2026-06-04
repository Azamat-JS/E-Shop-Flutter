import { Injectable, InternalServerErrorException } from "@nestjs/common";
import ImageKit = require("imagekit");

@Injectable()
export class ImageKitService {
  private readonly imagekit: ImageKit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
    });
  }

  getAuthenticationParameters() {
    try {
      return this.imagekit.getAuthenticationParameters();
    } catch (err) {
      throw new InternalServerErrorException("Failed to generate upload authentication parameters");
    }
  }
}