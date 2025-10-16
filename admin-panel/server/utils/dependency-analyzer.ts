import fs from 'fs'
import path from 'path'

export interface FileNode {
  id: string
  path: string
  fileName: string
  type:
    | 'component-ui'
    | 'component-cnx'
    | 'component-dms'
    | 'page'
    | 'composable'
    | 'layout'
    | 'server'
    | 'utils'
  imports: string[]
  importedBy: string[]
  lineCount?: number
}

export interface Edge {
  source: string
  target: string
}

export interface DependencyGraph {
  nodes: FileNode[]
  edges: Edge[]
}

export interface AnalysisResult {
  graph: DependencyGraph
  statistics: {
    totalFiles: number
    unusedFiles: number
    circularDependencies: number
    componentsByType: Record<string, number>
  }
  warnings: {
    unusedFiles: string[]
    circularDeps: string[][]
  }
}

// 분석 대상 디렉토리
const TARGET_DIRS = [
  'components/ui',
  'components/cnx',
  'components/dms',
  'pages',
  'composables',
  'layouts',
  'server/api',
  'utils',
]

// 파일 확장자
const FILE_EXTENSIONS = ['.vue', '.ts', '.js', '.tsx', '.jsx']

/**
 * 프로젝트 루트 경로 가져오기
 */
function getProjectRoot(): string {
  // Nuxt 서버에서 실행되므로 프로젝트 루트는 현재 디렉토리의 상위
  return process.cwd()
}

/**
 * 파일 타입 결정
 */
function determineFileType(filePath: string): FileNode['type'] {
  // 상대 경로와 절대 경로 모두 처리하기 위해 양쪽 슬래시 체크
  if (
    filePath.includes('/components/ui/') ||
    filePath.startsWith('components/ui/')
  )
    return 'component-ui'
  if (
    filePath.includes('/components/cnx/') ||
    filePath.startsWith('components/cnx/')
  )
    return 'component-cnx'
  if (
    filePath.includes('/components/dms/') ||
    filePath.startsWith('components/dms/')
  )
    return 'component-dms'
  if (filePath.includes('/pages/') || filePath.startsWith('pages/'))
    return 'page'
  if (filePath.includes('/composables/') || filePath.startsWith('composables/'))
    return 'composable'
  if (filePath.includes('/layouts/') || filePath.startsWith('layouts/'))
    return 'layout'
  if (filePath.includes('/server/') || filePath.startsWith('server/'))
    return 'server'
  if (filePath.includes('/utils/') || filePath.startsWith('utils/'))
    return 'utils'
  return 'component-ui'
}

/**
 * 디렉토리를 재귀적으로 탐색하여 모든 파일 가져오기
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dir)

    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        // node_modules, .git 등 제외
        if (!file.startsWith('.') && file !== 'node_modules') {
          getAllFiles(filePath, fileList)
        }
      } else {
        const ext = path.extname(file)
        if (FILE_EXTENSIONS.includes(ext)) {
          fileList.push(filePath)
        }
      }
    })
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }

  return fileList
}

/**
 * 파일에서 import 문 추출
 */
function extractImports(content: string, filePath: string): string[] {
  const imports: string[] = []
  const projectRoot = getProjectRoot()

  // import 문 정규식
  const importRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"]/g
  // require 문 정규식
  const requireRegex = /require\s*\(['"]([^'"]+)['"]\)/g
  // dynamic import 정규식
  const dynamicImportRegex = /import\s*\(['"]([^'"]+)['"]\)/g

  let match

  // import 문 추출
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  // require 문 추출
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  // dynamic import 추출
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.push(match[1])
  }

  // 상대 경로 및 alias 해석
  const resolvedImports = imports
    .map(importPath => {
      // 외부 패키지 제외 (node_modules)
      if (
        !importPath.startsWith('.') &&
        !importPath.startsWith('~') &&
        !importPath.startsWith('@/')
      ) {
        return null
      }

      try {
        let resolvedPath = importPath

        // ~ 또는 @/ alias를 프로젝트 루트로 해석
        if (importPath.startsWith('~/') || importPath.startsWith('@/')) {
          resolvedPath = importPath.replace(/^[~@]\//, '')
          resolvedPath = path.join(projectRoot, resolvedPath)
        } else {
          // 상대 경로 해석
          const dir = path.dirname(filePath)
          resolvedPath = path.join(dir, importPath)
        }

        // 확장자가 없으면 .vue, .ts, .js 순서로 시도
        if (!path.extname(resolvedPath)) {
          for (const ext of ['.vue', '.ts', '.js', '.tsx', '.jsx']) {
            const withExt = resolvedPath + ext
            if (fs.existsSync(withExt)) {
              return withExt
            }
          }
          // index 파일 시도
          for (const ext of ['.vue', '.ts', '.js']) {
            const indexPath = path.join(resolvedPath, `index${ext}`)
            if (fs.existsSync(indexPath)) {
              return indexPath
            }
          }
        } else if (fs.existsSync(resolvedPath)) {
          return resolvedPath
        }

        return null
      } catch (error) {
        return null
      }
    })
    .filter((p): p is string => p !== null)

  return resolvedImports
}

/**
 * 파일 라인 수 계산
 */
function countLines(content: string): number {
  return content.split('\n').length
}

/**
 * 의존성 그래프 생성
 */
export async function analyzeDependencies(): Promise<AnalysisResult> {
  const projectRoot = getProjectRoot()
  const nodesMap = new Map<string, FileNode>()
  const edges: Edge[] = []

  // 모든 타겟 디렉토리에서 파일 수집
  const allFiles: string[] = []
  for (const targetDir of TARGET_DIRS) {
    const fullPath = path.join(projectRoot, targetDir)
    if (fs.existsSync(fullPath)) {
      getAllFiles(fullPath, allFiles)
    }
  }

  // 각 파일 분석
  for (const filePath of allFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const relativePath = path.relative(projectRoot, filePath)
      const fileName = path.basename(filePath)
      const imports = extractImports(content, filePath)
      const lineCount = countLines(content)

      const node: FileNode = {
        id: relativePath,
        path: relativePath,
        fileName,
        type: determineFileType(relativePath),
        imports: [],
        importedBy: [],
        lineCount,
      }

      nodesMap.set(filePath, node)

      // import된 파일들의 상대 경로 저장
      for (const importPath of imports) {
        const importRelativePath = path.relative(projectRoot, importPath)
        node.imports.push(importRelativePath)
      }
    } catch (error) {
      console.error(`Error analyzing file ${filePath}:`, error)
    }
  }

  // importedBy 관계 구축 및 엣지 생성
  for (const [filePath, node] of nodesMap.entries()) {
    for (const importPath of node.imports) {
      // import된 파일의 절대 경로 찾기
      const importAbsPath = path.join(projectRoot, importPath)

      // importedBy 관계 추가
      const importedNode = nodesMap.get(importAbsPath)
      if (importedNode) {
        importedNode.importedBy.push(node.id)

        // 엣지 추가 (중복 제거)
        const edgeExists = edges.some(
          e => e.source === node.id && e.target === importedNode.id
        )
        if (!edgeExists) {
          edges.push({
            source: node.id,
            target: importedNode.id,
          })
        }
      }
    }
  }

  const nodes = Array.from(nodesMap.values())

  // 미사용 파일 감지
  const unusedFiles = detectUnusedFiles(nodes)

  // 순환 참조 감지
  const circularDeps = detectCircularDependencies(nodes)

  // 타입별 통계
  const componentsByType: Record<string, number> = {}
  nodes.forEach(node => {
    componentsByType[node.type] = (componentsByType[node.type] || 0) + 1
  })

  return {
    graph: { nodes, edges },
    statistics: {
      totalFiles: nodes.length,
      unusedFiles: unusedFiles.length,
      circularDependencies: circularDeps.length,
      componentsByType,
    },
    warnings: {
      unusedFiles,
      circularDeps,
    },
  }
}

/**
 * 미사용 컴포넌트 감지
 *
 *
 * 실제 미사용 판정 대상:
 * - UI/CNX/DMS 컴포넌트만 체크
 */
function detectUnusedFiles(nodes: FileNode[]): string[] {
  return nodes
    .filter(node => {
      // 컴포넌트 타입만 체크
      const componentTypes = ['component-ui', 'component-cnx', 'component-dms']

      // 컴포넌트가 아니면 제외
      if (!componentTypes.includes(node.type)) {
        return false
      }

      // importedBy가 비어있으면 미사용 컴포넌트
      return node.importedBy.length === 0
    })
    .map(node => node.path)
}

/**
 * 순환 참조 감지 (DFS)
 */
function detectCircularDependencies(nodes: FileNode[]): string[][] {
  const cycles: string[][] = []
  const visited = new Set<string>()
  const recursionStack = new Set<string>()
  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  function dfs(nodeId: string, path: string[] = []): void {
    if (recursionStack.has(nodeId)) {
      // 순환 발견
      const cycleStart = path.indexOf(nodeId)
      if (cycleStart !== -1) {
        const cycle = [...path.slice(cycleStart), nodeId]
        // 중복 제거 (같은 사이클의 다른 시작점)
        const cycleStr = cycle.sort().join(',')
        if (!cycles.some(c => c.sort().join(',') === cycleStr)) {
          cycles.push(cycle)
        }
      }
      return
    }

    if (visited.has(nodeId)) {
      return
    }

    visited.add(nodeId)
    recursionStack.add(nodeId)
    path.push(nodeId)

    const node = nodeMap.get(nodeId)
    if (node) {
      for (const importPath of node.imports) {
        dfs(importPath, [...path])
      }
    }

    recursionStack.delete(nodeId)
  }

  // 모든 노드에서 DFS 시작
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id)
    }
  }

  return cycles
}
