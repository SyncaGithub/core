// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('MAIL_HOST'),
                    secure: false,
                    auth: {
                        user: config.get('SMTP_USERNAME'),
                        pass: config.get('SMTP_PASSWORD'),
                    },
                },
                defaults: {
                    from: `"No Replay" <${config.get('SMTP_USERNAME')}>`,
                },
                template: {
                    dir: join(__dirname, 'src', 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: false,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
