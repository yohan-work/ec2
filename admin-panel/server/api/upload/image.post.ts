import { writeFile, copyFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async event => {
  try {
    const form = await readMultipartFormData(event)

    if (!form || !form.length) {
      throw createError({
        statusCode: 400,
        statusMessage: '파일이 업로드되지 않았습니다.',
      })
    }

    const file = form[0]
    if (!file || !file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: '잘못된 파일 형식입니다.',
      })
    }

    // 파일 확장자 검사
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const fileExtension = file.filename
      .toLowerCase()
      .slice(file.filename.lastIndexOf('.'))

    if (!allowedExtensions.includes(fileExtension)) {
      throw createError({
        statusCode: 400,
        statusMessage:
          '지원하지 않는 이미지 형식입니다. (jpg, png, gif, webp만 가능)',
      })
    }

    // 파일 크기 검사 (5MB 제한)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: '파일 크기가 너무 큽니다. (최대 5MB)',
      })
    }

    // 업로드 디렉토리 설정
    const publicDir = join(process.cwd(), 'public', 'uploads', 'images')
    const outputDir = join(
      process.cwd(),
      '.output',
      'public',
      'uploads',
      'images'
    )

    // 프로덕션 환경 확인 (.output 디렉토리 존재 여부로 판단)
    const isProduction = existsSync(join(process.cwd(), '.output'))

    console.log(
      `이미지 업로드 환경: ${isProduction ? 'Production' : 'Development'}`
    )
    console.log(`Public 디렉토리: ${publicDir}`)
    if (isProduction) {
      console.log(`Output 디렉토리: ${outputDir}`)
    }

    // 디렉토리 생성
    await mkdir(publicDir, { recursive: true })
    if (isProduction) {
      await mkdir(outputDir, { recursive: true })
    }

    // 파일명 생성 및 저장
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.filename}`
    const publicFilePath = join(publicDir, fileName)
    const outputFilePath = join(outputDir, fileName)

    // 파일 저장 (public 디렉토리)
    await writeFile(publicFilePath, file.data)

    // 프로덕션 환경에서는 .output 디렉토리에도 복사
    if (isProduction) {
      await copyFile(publicFilePath, outputFilePath)
      console.log(`이미지 파일 복사 완료: ${outputFilePath}`)
    }

    // 접근 가능한 URL 생성
    const fileUrl = `/uploads/images/${fileName}`

    return {
      success: true,
      data: {
        url: fileUrl,
        filename: fileName,
        originalName: file.filename,
        size: file.data.length,
      },
      message: '이미지가 성공적으로 업로드되었습니다.',
    }
  } catch (error: any) {
    console.error('이미지 업로드 오류:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '이미지 업로드 중 오류가 발생했습니다.',
    })
  }
})
