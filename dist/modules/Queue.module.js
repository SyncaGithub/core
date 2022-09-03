"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QueueModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const tempEnums_1 = require("../types/tempEnums");
let QueueModule = QueueModule_1 = class QueueModule {
    static register(port) {
        return {
            module: QueueModule_1,
            imports: [
                microservices_1.ClientsModule.register([
                    {
                        name: tempEnums_1.EInject.Queue,
                        transport: microservices_1.Transport.REDIS,
                        options: {
                            host: "localhost",
                            port: port,
                        },
                    },
                ]),
            ],
            providers: [],
            exports: [microservices_1.ClientsModule],
        };
    }
};
QueueModule = QueueModule_1 = __decorate([
    (0, common_1.Module)({})
], QueueModule);
exports.QueueModule = QueueModule;
//# sourceMappingURL=Queue.module.js.map