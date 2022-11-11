import { HttpException } from '@nestjs/common';

enum DEFAULT_ERROR_CODE {
  CERTIFICATE_ERROR = 'CERTIFICATE_ERROR',
  CERTIFICATE_AGE = 'CERTIFICATE_AGE',
  USERID_INFO = 'USERID_INFO',
  LOGIN_NEEDED = 'LOGIN_NEEDED',
  WRONG_TOKEN = 'WRONG_TOKEN',
  SUBMIT_CONTRACT_NO_CERT_INFO = 'SUBMIT_CONTRACT_NO_CERT_INFO',
  KAKAO_NOT_SIGN_UP = 'KAKAO_NOT_SIGN_UP',
  KAKAO_PLATFORM_CONNECT = 'KAKAO_PLATFORM_CONNECT',
  KAKAO_VRFY = 'KAKAO_VRFY',
  APPLE_VRFY = 'APPLE_VRFY',
  USER_NOT_EXIST = 'USER_NOT_EXIST',
  FCM_TOKEN_NEEDED = 'FCM_TOKEN_NEEDED',
  TOPIC_NOT_MATCHED = 'TOPIC_NOT_MATCHED',
  TRANSACTION_ROLLBACK = 'TRANSACTION_ROLLBACK',
}

interface ErrorResponse {
  name: string;
  statusCode: number;
}

const _converter: Record<DEFAULT_ERROR_CODE, ErrorResponse> = {
  [DEFAULT_ERROR_CODE.CERTIFICATE_ERROR]: {
    name: '인증 과정 중 문제가 발생하였습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.CERTIFICATE_AGE]: {
    name: '미성년자 자문 체결이 불가능합니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.USERID_INFO]: {
    name: '요청에 유저정보가 존재하지 않습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.LOGIN_NEEDED]: {
    name: '로그인이 필요합니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.WRONG_TOKEN]: {
    name: '이전 로그인 정보가 만료되었습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.SUBMIT_CONTRACT_NO_CERT_INFO]: {
    name: '인증 정보가 만료되었습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.KAKAO_NOT_SIGN_UP]: {
    name: '카카오 가입되어있지 않습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.KAKAO_PLATFORM_CONNECT]: {
    name: '카카오 플랫폼 연결이 되지 않았습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.KAKAO_VRFY]: {
    name: '카카오 로그인이 실패하였습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.APPLE_VRFY]: {
    name: '애플 로그인이 실패하였습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.USER_NOT_EXIST]: {
    name: '사용자가 가입하지 않았거나 이미 탈퇴한 회원입니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.FCM_TOKEN_NEEDED]: {
    name: 'fcmtoken이 필요합니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.TOPIC_NOT_MATCHED]: {
    name: '알리미 주제가 맞지 않습니다',
    statusCode: 400,
  },
  [DEFAULT_ERROR_CODE.TRANSACTION_ROLLBACK]: {
    name: '트랜잭션 상의 에러로 인해 작업내용이 롤백됩니다',
    statusCode: 400,
  },
};

const buildError = (code: DEFAULT_ERROR_CODE) =>
  new DefaultError(_converter[code], code);

class DefaultError extends HttpException {
  private static readonly ERROR_NAME = 'ERROR';
  public defaultCode: string = DefaultError.ERROR_NAME;

  constructor(errorResponse: ErrorResponse, defaultCode?: string) {
    super(errorResponse.name, errorResponse.statusCode);
    Error.captureStackTrace(this, DefaultError);

    this.name = DefaultError.ERROR_NAME;
    if (defaultCode) {
      this.defaultCode = defaultCode;
    }
  }
}

export default DefaultError;
export { DEFAULT_ERROR_CODE, buildError };
