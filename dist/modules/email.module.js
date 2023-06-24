"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const email_service_1 = require("../services/email.service");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
let EmailModule = EmailModule_1 = class EmailModule {
    static register(path) {
        return {
            module: EmailModule_1,
            imports: [
                mailer_1.MailerModule.forRootAsync({
                    useFactory: async () => ({
                        transport: {
                            host: process.env.MAIL_HOST,
                            port: process.env.t,
                            secure: true,
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
                            adapter: new ejs_adapter_1.EjsAdapter(),
                            options: {
                                strict: false,
                            },
                        },
                    })
                }),
            ]
        };
    }
};
EmailModule = EmailModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService]
    })
], EmailModule);
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map