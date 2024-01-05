export enum EEmailTemplates{
    EmailConfirmation = 'email-confirmation',
    ResetPassword = 'reset-password',
    JobError = 'job-error',
    JobFailed = 'job-failed',
    OTPCode = 'otp-code',
};

export const EmailTemplateSubjects = {
    [EEmailTemplates.EmailConfirmation]: 'Welcome to Synca App! Confirm your Email',
    [EEmailTemplates.ResetPassword]: 'Reset your password',
    [EEmailTemplates.JobError]: 'An Error as Occurred on Automatic Job',
    [EEmailTemplates.JobFailed]: 'A Automatic Job as Been Failed',
};