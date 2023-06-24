import { MailerService } from '@nestjs-modules/mailer';
import { User } from "../models";
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserWelcome(user: User, token: string): Promise<void>;
}
