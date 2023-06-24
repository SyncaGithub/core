// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { join } from 'path';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => {
                console.log(join(__dirname, 'src', 'templates'))
                return ({
                    transport: {
                        host: process.env.MAIL_HOST,
                        secure: false,
                        auth: {
                            user: process.env.SMTP_USERNAME,
                            pass: process.env.SMTP_PASSWORD,
                        },
                    },
                    defaults: {
                        from: `"No Replay" <${process.env.SMTP_USERNAME}>`,
                    },
                    template: {
                        dir: join(__dirname, 'src', 'templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: false,
                        },
                    },
                })
            },
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
