import { analyzeDependencies } from '~/server/utils/dependency-analyzer'

/**
 * 의존성 그래프 분석 API
 * GET /api/dev-tools/dependency-graph
 */
export default defineEventHandler(async event => {
  try {
    console.log('Starting dependency analysis...')

    const result = await analyzeDependencies()

    console.log(
      `Analysis complete: ${result.statistics.totalFiles} files analyzed`
    )
    console.log(`Unused files: ${result.statistics.unusedFiles}`)
    console.log(
      `Circular dependencies: ${result.statistics.circularDependencies}`
    )

    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error analyzing dependencies:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
})
