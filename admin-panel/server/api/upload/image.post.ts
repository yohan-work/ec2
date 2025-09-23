import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import { join } from 'path'

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

    // 업로드 디렉토리 생성
    // const uploadDir = join(process.cwd(), 'public', 'uploads', 'images')
    const uploadDir = join(process.cwd(), 'uploads', 'images')

    await mkdir(uploadDir, { recursive: true })

    // 파일명 생성 (타임스탬프 + 원본명)
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.filename}`
    const filePath = join(uploadDir, fileName)

    // 파일 저장
    await writeFile(filePath, file.data)

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
