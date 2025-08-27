import { readFileSync } from 'fs'
import { join } from 'path'
import * as yaml from 'js-yaml'

export default defineEventHandler(async event => {
  try {
    // YAML 파일 읽기
    const yamlPath = join(process.cwd(), 'docs', 'openapi.yaml')
    console.log('OpenAPI YAML 파일 경로:', yamlPath)

    const yamlContent = readFileSync(yamlPath, 'utf8')
    console.log('YAML 파일 읽기 성공, 크기:', yamlContent.length)

    // YAML을 JSON으로 변환
    const openApiSpec = yaml.load(yamlContent) as any
    console.log('YAML 파싱 성공')

    // Content-Type 헤더 설정
    setHeader(event, 'Content-Type', 'application/json')
    setHeader(event, 'Access-Control-Allow-Origin', '*')

    return openApiSpec
  } catch (error: any) {
    console.error('OpenAPI 스펙 로드 오류:', error)
    console.error('에러 스택:', error.stack)
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAPI 스펙을 불러올 수 없습니다.',
      data: {
        error: error.message,
        stack: error.stack,
      },
    })
  }
})
