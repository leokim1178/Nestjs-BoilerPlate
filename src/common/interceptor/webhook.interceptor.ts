import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as Sentry from '@sentry/minimal';
import { IncomingWebhook } from '@slack/webhook';
import { catchError, of } from 'rxjs';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) /** : Observable<any>*/ {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);

        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
        webhook.send({
          attachments: [
            {
              color: 'danger',
              title_link: 'https://sentry.io/organizations/your-org/issues/',
              title: '⚠️ 160-Assist-Server 에러 발생 ⚠️',
              fields: [
                {
                  title: `Error Message : ${error.message}`,
                  value: `
                    Error status : ${error.status}
  Error P160Code : ${error.p160Code ? error.p160Code : 'not P160Code'}`,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(), // unix form
            },
          ],
        });
        return of(error);
      }),
    );
  }
}
