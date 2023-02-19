import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class TemplateLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]): any {
    super.log(`🚀 ${message}`, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(`🐛 ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(`🚨 ${message}`, ...optionalParams);
  }

  error(error: any, ...optionalParams: any): void {
    console.log(error);
    if (typeof error === 'object') {
      super.error(
        `🔥 ${error.statusCode} ${error.name}
timestamp: ${error.timestamp} 
path: ${error.url}
message : ${error.message}`,
        ...optionalParams,
      );
    } else {
      super.error(`🔥 ${error}`, ...optionalParams);
    }
  }
}
