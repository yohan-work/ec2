import { writeFile } from 'fs/promises'
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

    // 개발/프로덕션 환경에 따른 업로드 디렉토리 설정
    const outputDir = join(
      process.cwd(),
      '.output',
      'public',
      'uploads',
      'images'
    )
    const publicDir = join(process.cwd(), 'public', 'uploads', 'images')

    // .output 폴더가 존재하면 프로덕션으로 간주, 없으면 개발 환경으로 간주
    const isProduction = existsSync(join(process.cwd(), '.output'))
    const uploadDir = isProduction ? outputDir : publicDir

    console.log(
      `이미지 업로드 환경: ${isProduction ? 'Production' : 'Development'}`
    )
    console.log(`업로드 디렉토리: ${uploadDir}`)

    await mkdir(uploadDir, { recursive: true })

    // 파일명 생성 (타임스탬프 + 원본명)
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.filename}`
    const filePath = join(uploadDir, fileName)

    // 파일 저장
    await writeFile(filePath, file.data)

    // 프로덕션 환경에서는 public 폴더에도 백업 저장 (빌드 시 복사용)
    if (isProduction) {
      await mkdir(publicDir, { recursive: true })
      const publicFilePath = join(publicDir, fileName)
      await writeFile(publicFilePath, file.data)
      console.log(`백업 저장 완료: ${publicFilePath}`)
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
