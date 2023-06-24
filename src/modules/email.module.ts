// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import {DynamicModule, Global, Module} from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { join } from 'path';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {EInject} from "../types";

// @Global()
// @Module({
//     imports: [
//         MailerModule.forRootAsync({
//             useFactory: async (config) => {
//                 console.log(config)
//                 console.log(join(__dirname, 'src', 'templates'))
//                 return ({
//                     transport: {
//                         host: process.env.MAIL_HOST,
//                         secure: false,
//                         auth: {
//                             user: process.env.SMTP_USERNAME,
//                             pass: process.env.SMTP_PASSWORD,
//                         },
//                     },
//                     defaults: {
//                         from: `"No Replay" <${process.env.SMTP_USERNAME}>`,
//                     },
//                     template: {
//                         dir: join(__dirname, 'src', 'templates'),
//                         adapter: new HandlebarsAdapter(),
//                         options: {
//                             strict: false,
//                         },
//                     },
//                 })
//             },
//         }),
//     ],
//     providers: [EmailService],
//     exports: [EmailService],
// })
// export class EmailModule {}

@Global()
@Module({
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {
    static register(path: string): DynamicModule {
        return {
            module: EmailModule,
            imports: [
                MailerModule.forRootAsync({
                    useFactory: async () => {
                        console.log(path)
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
                                dir: path,
                                adapter: new HandlebarsAdapter(),
                                options: {
                                    strict: false,
                                },
                            },
                        })
                    },
                }),
            ]
        };
    }
}
