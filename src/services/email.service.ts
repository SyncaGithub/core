import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {User} from "../models";
import {EEmailTemplates, EmailTemplateSubjects} from "../types";

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async sendEmail(to: string[],user: User, template: EEmailTemplates, context?: any) {
        await this.mailerService.sendMail({
            to: to,
            from: "No Replay <info@synca.co.il>", // override default from
            subject: EmailTemplateSubjects[template],
            template, // `.ejs` extension is appended automatically
            context: { // filling <%= %> brackets with content
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                ...context
            },
        });
    }
}
