import { Inject, Injectable } from '@nestjs/common';

import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { EmailModuleOptions, EmailVar } from './email.interfaces';

@Injectable()
export class EmailService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly emailModuleOptions: EmailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append(
      'from',
      `Robin from Camus <mailgun@${this.emailModuleOptions.domain}>`,
    );
    form.append('to', `lshrobin02@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((emailVar) =>
      form.append(`v:${emailVar.key}`, emailVar.value),
    );

    try {
      await got(
        `https://api.mailgun.net/v3/${this.emailModuleOptions.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.emailModuleOptions.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
    } catch (error) {}
  }

  sendVerificationEmail(username: string, code: string) {
    this.sendEmail('Verify Your Email', 'email-verification', [
      { key: 'username', value: username },
      { key: 'code', value: code },
    ]);
  }
}
