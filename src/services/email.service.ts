// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {User} from "../models";

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async sendUserWelcome(user: User, token: string) {
        const confirmation_url = `example.com/auth/confirm?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            // from: "No Replay <support@example.com>", // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            template: '/welcome', // `.ejs` extension is appended automatically
            context: { // filling <%= %> brackets with content
                name: `${user.firstName} ${user.lastName}`,
                confirmation_url,
            },
        });
    }
}
