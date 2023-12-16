"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateSubjects = exports.EEmailTemplates = void 0;
var EEmailTemplates;
(function (EEmailTemplates) {
    EEmailTemplates["EmailConfirmation"] = "email-confirmation";
    EEmailTemplates["ResetPassword"] = "reset-password";
    EEmailTemplates["JobError"] = "job-error";
    EEmailTemplates["JobFailed"] = "job-failed";
})(EEmailTemplates || (exports.EEmailTemplates = EEmailTemplates = {}));
;
exports.EmailTemplateSubjects = {
    [EEmailTemplates.EmailConfirmation]: 'Welcome to Synca App! Confirm your Email',
    [EEmailTemplates.ResetPassword]: 'Reset your password',
    [EEmailTemplates.JobError]: 'An Error as Occurred on Automatic Job',
    [EEmailTemplates.JobFailed]: 'A Automatic Job as Been Failed',
};
//# sourceMappingURL=emails.js.map