import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminAddUserToGroupCommand,
  MessageActionType,
  DeliveryMediumType,
} from '@aws-sdk/client-cognito-identity-provider'

// Cognito 클라이언트 초기화
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NUXT_PUBLIC_COGNITO_REGION || 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export interface CreateCognitoUserOptions {
  email: string
  temporaryPassword?: string
  sendWelcomeEmail?: boolean
  userAttributes?: Record<string, string>
}

export interface CognitoUserResult {
  userId: string
  email: string
  temporaryPassword?: string
}

/**
 * AWS Cognito에 새 사용자 생성
 */
export async function createCognitoUser(
  options: CreateCognitoUserOptions
): Promise<CognitoUserResult> {
  const userPoolId = process.env.NUXT_PUBLIC_COGNITO_USER_POOL_ID

  console.log('=== Cognito 설정 확인 ===')
  console.log('User Pool ID:', userPoolId ? '설정됨' : '설정되지 않음')
  console.log(
    'AWS Access Key ID:',
    process.env.AWS_ACCESS_KEY_ID ? '설정됨' : '설정되지 않음'
  )
  console.log(
    'AWS Secret Access Key:',
    process.env.AWS_SECRET_ACCESS_KEY ? '설정됨' : '설정되지 않음'
  )
  console.log('Region:', process.env.NUXT_PUBLIC_COGNITO_REGION)

  if (!userPoolId) {
    throw new Error('COGNITO_USER_POOL_ID가 설정되지 않았습니다.')
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS 자격 증명이 설정되지 않았습니다.')
  }

  try {
    // 임시 비밀번호 생성 (제공되지 않은 경우)
    const temporaryPassword =
      options.temporaryPassword || generateTemporaryPassword()

    // 사용자 속성 설정
    const userAttributes = [
      {
        Name: 'email',
        Value: options.email,
      },
      {
        Name: 'email_verified',
        Value: 'true', // 관리자가 생성하는 계정은 이메일 검증 완료로 설정
      },
    ]

    // 추가 사용자 속성이 있으면 포함
    if (options.userAttributes) {
      Object.entries(options.userAttributes).forEach(([key, value]) => {
        userAttributes.push({
          Name: key,
          Value: value,
        })
      })
    }

    console.log('Cognito 사용자 생성 시작:', {
      email: options.email,
      userPoolId,
      sendWelcomeEmail: options.sendWelcomeEmail,
    })

    // 1. Cognito에 사용자 생성
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: options.email, // 이메일을 사용자명으로 사용
      UserAttributes: userAttributes,
      TemporaryPassword: temporaryPassword,
      MessageAction: MessageActionType.SUPPRESS, // 항상 웰컴 이메일 억제
      DesiredDeliveryMediums: [DeliveryMediumType.EMAIL],
    })

    const createResult = await cognitoClient.send(createUserCommand)
    const userId = createResult.User?.Username

    if (!userId) {
      throw new Error('Cognito 사용자 생성 실패: User ID를 받지 못했습니다.')
    }

    console.log('Cognito 사용자 생성 성공:', {
      userId,
      email: options.email,
    })

    // 임시 비밀번호로 사용자 생성 완료
    // 사용자는 첫 로그인 시 비밀번호를 변경해야 함
    console.log('사용자 생성 완료 - 임시 비밀번호 사용')

    return {
      userId,
      email: options.email,
      temporaryPassword: temporaryPassword, // 항상 임시 비밀번호 반환
    }
  } catch (error: any) {
    console.error('=== Cognito 사용자 생성 실패 상세 정보 ===')
    console.error('에러 객체:', error)
    console.error('에러 메시지:', error.message)
    console.error('에러 코드:', error.code)
    console.error('에러 이름:', error.name)
    console.error('에러 스택:', error.stack)
    console.error('요청 정보:', {
      email: options.email,
      userPoolId,
      region: process.env.NUXT_PUBLIC_COGNITO_REGION,
    })

    let errorMessage = '알 수 없는 오류가 발생했습니다.'

    if (error.code === 'UsernameExistsException') {
      errorMessage = '이미 존재하는 이메일입니다.'
    } else if (error.code === 'InvalidPasswordException') {
      errorMessage = '비밀번호가 정책에 맞지 않습니다.'
    } else if (error.code === 'InvalidParameterException') {
      errorMessage = '잘못된 매개변수입니다.'
    } else if (error.code === 'UserPoolTaggingException') {
      errorMessage = 'User Pool 설정 오류입니다.'
    } else if (
      error.code === 'UnauthorizedOperation' ||
      error.code === 'AccessDenied'
    ) {
      errorMessage = 'AWS 권한이 부족합니다. IAM 설정을 확인해주세요.'
    } else if (error.code === 'InvalidUserPoolConfigurationException') {
      errorMessage = 'Cognito User Pool 설정이 잘못되었습니다.'
    } else if (error.message?.includes('credentials')) {
      errorMessage = 'AWS 자격 증명 오류입니다.'
    } else if (error.message?.includes('region')) {
      errorMessage = 'AWS 리전 설정 오류입니다.'
    }

    throw new Error(
      `Cognito 사용자 생성 실패: ${errorMessage} (원본: ${error.message})`
    )
  }
}

/**
 * 임시 비밀번호 생성
 */
function generateTemporaryPassword(): string {
  const length = 12
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''

  // 최소 요구사항 충족을 위해 각 문자 유형에서 하나씩 선택
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)] // 소문자
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)] // 대문자
  password += '0123456789'[Math.floor(Math.random() * 10)] // 숫자
  password += '!@#$%^&*'[Math.floor(Math.random() * 8)] // 특수문자

  // 나머지 길이만큼 랜덤 문자 추가
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)]
  }

  // 문자열 섞기
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}

/**
 * Cognito 사용자를 그룹에 추가 (선택사항)
 */
export async function addUserToGroup(
  userId: string,
  groupName: string
): Promise<void> {
  const userPoolId = process.env.NUXT_PUBLIC_COGNITO_USER_POOL_ID

  if (!userPoolId) {
    throw new Error('COGNITO_USER_POOL_ID가 설정되지 않았습니다.')
  }

  try {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: userPoolId,
      Username: userId,
      GroupName: groupName,
    })

    await cognitoClient.send(command)
    console.log(`사용자 ${userId}를 그룹 ${groupName}에 추가했습니다.`)
  } catch (error: any) {
    console.error('그룹 추가 실패:', error)
    throw new Error(`그룹 추가 실패: ${error.message}`)
  }
}
