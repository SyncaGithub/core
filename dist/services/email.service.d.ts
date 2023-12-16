import { MailerService } from '@nestjs-modules/mailer';
import { User } from "../models";
import { EEmailTemplates } from "../types";
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmail(to: string[], user: User, template: EEmailTemplates, context?: any): Promise<void>;
}
