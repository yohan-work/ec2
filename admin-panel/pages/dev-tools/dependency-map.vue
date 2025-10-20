<template>
  <div class="dependency-map">
    <div class="header">
      <h1>컴포넌트 의존성 시각화</h1>
      <div class="header-actions">
        <button @click="refreshData" :disabled="loading" class="refresh-btn">
          {{ loading ? '분석 중...' : '새로고침' }}
        </button>
      </div>
    </div>

    <!-- 통계 대시보드 -->
    <div class="statistics" v-if="analysisData">
      <div class="stat-card">
        <div class="stat-label">전체 파일</div>
        <div class="stat-value">{{ analysisData.statistics.totalFiles }}</div>
      </div>
      <div
        class="stat-card warning"
        v-if="analysisData.statistics.unusedFiles > 0"
        :title="'다른 파일에서 import하지 않는 컴포넌트입니다.\n(UI/CNX/DMS 컴포넌트만 체크)'"
      >
        <div class="stat-label">미사용 컴포넌트 ⓘ</div>
        <div class="stat-value">{{ analysisData.statistics.unusedFiles }}</div>
      </div>
      <div
        class="stat-card danger"
        v-if="analysisData.statistics.circularDependencies > 0"
      >
        <div class="stat-label">순환 참조</div>
        <div class="stat-value">
          {{ analysisData.statistics.circularDependencies }}
        </div>
      </div>
      <div
        class="stat-card"
        v-for="(count, type) in analysisData.statistics.componentsByType"
        :key="type"
      >
        <div class="stat-label">{{ formatType(type) }}</div>
        <div class="stat-value">{{ count }}</div>
      </div>
    </div>

    <!-- 필터 및 검색 -->
    <div class="controls">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="파일명 검색..."
          @input="handleSearch"
        />
      </div>

      <div class="filters">
        <label class="filter-label">필터:</label>
        <label v-for="type in fileTypes" :key="type" class="filter-item">
          <input
            type="checkbox"
            :value="type"
            v-model="selectedTypes"
            @change="handleFilterChange"
          />
          <span :style="{ color: getTypeColor(type) }">{{
            formatType(type)
          }}</span>
        </label>
      </div>

      <div class="view-options">
        <label
          class="filter-item"
          :title="'UI/CNX/DMS 컴포넌트 중 다른 파일에서 import하지 않는 컴포넌트만 표시합니다.'"
        >
          <input
            type="checkbox"
            v-model="showUnusedOnly"
            @change="handleFilterChange"
          />
          <span>미사용 컴포넌트만 보기</span>
        </label>
        <label class="filter-item">
          <input
            type="checkbox"
            v-model="showCircularOnly"
            @change="handleFilterChange"
          />
          <span>순환 참조만 보기</span>
        </label>
      </div>

      <div class="layout-options">
        <label class="filter-label">레이아웃:</label>
        <label
          v-for="layout in ['force', 'cluster', 'hierarchical']"
          :key="layout"
          class="filter-item"
        >
          <input
            type="radio"
            name="layout"
            :value="layout"
            v-model="layoutType"
            @change="renderGraph"
          />
          <span>{{ formatLayoutName(layout) }}</span>
        </label>
      </div>
    </div>

    <!-- 경고 표시 -->
    <div
      class="warnings"
      v-if="
        analysisData &&
        (analysisData.warnings.unusedFiles.length > 0 ||
          analysisData.warnings.circularDeps.length > 0)
      "
    >
      <div
        class="warning-section"
        v-if="analysisData.warnings.unusedFiles.length > 0"
      >
        <h3>
          미사용 컴포넌트 ({{ analysisData.warnings.unusedFiles.length }}개)
        </h3>
        <ul class="warning-list">
          <li
            v-for="file in analysisData.warnings.unusedFiles.slice(0, 10)"
            :key="file"
          >
            {{ file }}
          </li>
          <li v-if="analysisData.warnings.unusedFiles.length > 10">
            ... 그 외 {{ analysisData.warnings.unusedFiles.length - 10 }}개
          </li>
        </ul>
      </div>

      <div
        class="warning-section"
        v-if="analysisData.warnings.circularDeps.length > 0"
      >
        <h3>
          🔄 순환 참조 ({{ analysisData.warnings.circularDeps.length }}개)
        </h3>
        <ul class="warning-list">
          <li
            v-for="(cycle, index) in analysisData.warnings.circularDeps.slice(
              0,
              5
            )"
            :key="index"
          >
            {{ cycle.join(' → ') }}
          </li>
          <li v-if="analysisData.warnings.circularDeps.length > 5">
            ... 그 외 {{ analysisData.warnings.circularDeps.length - 5 }}개
          </li>
        </ul>
      </div>
    </div>

    <!-- D3.js 그래프 캔버스 -->
    <div class="graph-container">
      <svg ref="svgRef" class="graph-svg"></svg>
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>의존성 분석 중...</p>
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>

    <!-- 상세 정보 패널 -->
    <div class="detail-panel" v-if="selectedNode">
      <div class="detail-header">
        <h3>{{ selectedNode.fileName }}</h3>
        <button @click="selectedNode = null" class="close-btn">×</button>
      </div>
      <div class="detail-content">
        <p><strong>경로:</strong> {{ selectedNode.path }}</p>
        <p><strong>타입:</strong> {{ formatType(selectedNode.type) }}</p>
        <p><strong>라인 수:</strong> {{ selectedNode.lineCount || 'N/A' }}</p>

        <div class="detail-section">
          <h4>Import하는 파일 ({{ selectedNode.imports.length }}개)</h4>
          <ul v-if="selectedNode.imports.length > 0">
            <li v-for="imp in selectedNode.imports" :key="imp">{{ imp }}</li>
          </ul>
          <p v-else class="empty-message">없음</p>
        </div>

        <div class="detail-section">
          <h4>Import되는 곳 ({{ selectedNode.importedBy.length }}개)</h4>
          <ul v-if="selectedNode.importedBy.length > 0">
            <li v-for="imp in selectedNode.importedBy" :key="imp">{{ imp }}</li>
          </ul>
          <p v-else class="empty-message">사용되지 않음</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import * as d3 from 'd3'

interface FileNode {
  id: string
  path: string
  fileName: string
  type: string
  imports: string[]
  importedBy: string[]
  lineCount?: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Edge {
  source: string | FileNode
  target: string | FileNode
}

interface AnalysisData {
  graph: {
    nodes: FileNode[]
    edges: Edge[]
  }
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

// 반응형 데이터
const loading = ref(false)
const error = ref<string | null>(null)
const analysisData = ref<AnalysisData | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)
const selectedNode = ref<FileNode | null>(null)
const showHelp = ref(false)

// 필터링
const searchQuery = ref('')
const selectedTypes = ref<string[]>([])
const fileTypes = ref<string[]>([])
const showUnusedOnly = ref(false)
const showCircularOnly = ref(false)

// 레이아웃
const layoutType = ref<'force' | 'cluster' | 'hierarchical'>('force')

// 색상 매핑
const typeColors: Record<string, string> = {
  'component-ui': '#3b82f6',
  'component-cnx': '#10b981',
  'component-dms': '#f59e0b',
  page: '#ef4444',
  composable: '#8b5cf6',
  layout: '#ec4899',
  server: '#06b6d4',
  utils: '#6366f1',
}

/**
 * 타입에 따른 색상 반환
 */
function getTypeColor(type: string): string {
  return typeColors[type] || '#6b7280'
}

/**
 * 타입 이름 포맷팅
 */
function formatType(type: string): string {
  const typeNames: Record<string, string> = {
    'component-ui': 'UI Component',
    'component-cnx': 'CNX Component',
    'component-dms': 'DMS Component',
    page: 'Page',
    composable: 'Composable',
    layout: 'Layout',
    server: 'Server',
    utils: 'Utils',
  }
  return typeNames[type] || type
}

/**
 * 레이아웃 이름 포맷팅
 */
function formatLayoutName(layout: string): string {
  const layoutNames: Record<string, string> = {
    force: 'Force (자유 배치)',
    cluster: 'Cluster (타입별 그룹)',
    hierarchical: 'Hierarchical (계층 번들링)',
  }
  return layoutNames[layout] || layout
}

/**
 * 데이터 가져오기
 */
async function fetchData() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/dev-tools/dependency-graph')
    const result = await response.json()

    if (result.success) {
      analysisData.value = result.data

      // 파일 타입 목록 추출
      const types = new Set<string>()
      result.data.graph.nodes.forEach((node: FileNode) => {
        types.add(node.type)
      })
      fileTypes.value = Array.from(types)
      selectedTypes.value = Array.from(types) // 기본적으로 모두 선택

      await nextTick()
      renderGraph()
    } else {
      error.value = result.error || '데이터를 가져올 수 없습니다.'
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}

/**
 * 새로고침
 */
function refreshData() {
  fetchData()
}

/**
 * 검색 처리
 */
function handleSearch() {
  renderGraph()
}

/**
 * 필터 변경 처리
 */
function handleFilterChange() {
  renderGraph()
}

/**
 * 노드 및 엣지 필터링 (공통)
 */
function getFilteredData() {
  if (!analysisData.value) return { nodes: [], edges: [] }

  // 필터링된 노드 및 엣지
  let nodes = [...analysisData.value.graph.nodes]
  let edges = [...analysisData.value.graph.edges]

  // 타입 필터
  if (selectedTypes.value.length > 0) {
    nodes = nodes.filter(n => selectedTypes.value.includes(n.type))
  }

  // 검색 필터
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    nodes = nodes.filter(
      n =>
        n.fileName.toLowerCase().includes(query) ||
        n.path.toLowerCase().includes(query)
    )
  }

  // 미사용 컴포넌트만 보기
  if (showUnusedOnly.value) {
    const componentTypes = ['component-ui', 'component-cnx', 'component-dms']
    nodes = nodes.filter(
      n => componentTypes.includes(n.type) && n.importedBy.length === 0
    )
  }

  // 순환 참조만 보기
  if (
    showCircularOnly.value &&
    analysisData.value.warnings.circularDeps.length > 0
  ) {
    const circularFiles = new Set(
      analysisData.value.warnings.circularDeps.flat()
    )
    nodes = nodes.filter(n => circularFiles.has(n.id))
  }

  // 노드 ID 집합
  const nodeIds = new Set(nodes.map(n => n.id))

  // 엣지 필터 (양쪽 노드가 모두 존재하는 경우만)
  edges = edges.filter(
    e =>
      nodeIds.has(typeof e.source === 'string' ? e.source : e.source.id) &&
      nodeIds.has(typeof e.target === 'string' ? e.target : e.target.id)
  )

  return { nodes, edges }
}

/**
 * 그래프 렌더링 (D3.js)
 */
function renderGraph() {
  if (!analysisData.value || !svgRef.value) return

  const { nodes, edges } = getFilteredData()

  if (nodes.length === 0) {
    const svg = d3.select(svgRef.value)
    svg.selectAll('*').remove()
    return
  }

  // 레이아웃 타입에 따라 다른 렌더링 함수 호출
  switch (layoutType.value) {
    case 'cluster':
      renderClusterLayout(nodes, edges)
      break
    case 'hierarchical':
      renderHierarchicalLayout(nodes, edges)
      break
    case 'force':
    default:
      renderForceLayout(nodes, edges)
      break
  }
}

/**
 * Cluster Layout 렌더링 (타입별 그룹)
 */
function renderClusterLayout(nodes: FileNode[], edges: Edge[]) {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  // SVG 크기
  const container = svgRef.value.parentElement
  const width = container?.clientWidth || 1200
  const height = container?.clientHeight || 800

  svg.attr('width', width).attr('height', height)

  // 노드와 엣지 복사 (시뮬레이션이 원본을 수정하지 않도록)
  const simulationNodes = nodes.map(n => ({ ...n }))
  const simulationEdges = edges.map(e => ({ ...e }))

  // 줌/팬 기능
  const g = svg.append('g')

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 4])
    .on('zoom', event => {
      g.attr('transform', event.transform)
    })

  svg.call(zoom as any)

  // 타입별 중심 위치 계산 (3x3 그리드)
  const types = Array.from(new Set(nodes.map(n => n.type)))
  const cols = Math.ceil(Math.sqrt(types.length))
  const cellWidth = width / cols
  const cellHeight = height / Math.ceil(types.length / cols)

  const typePositions: Record<string, { x: number; y: number }> = {}
  types.forEach((type, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    typePositions[type] = {
      x: cellWidth * col + cellWidth / 2,
      y: cellHeight * row + cellHeight / 2,
    }
  })

  // Force simulation with type clustering
  const simulation = d3
    .forceSimulation(simulationNodes as any)
    .force(
      'link',
      d3
        .forceLink(simulationEdges as any)
        .id((d: any) => d.id)
        .distance(50)
        .strength(0.5)
    )
    .force('charge', d3.forceManyBody().strength(-100))
    .force('collision', d3.forceCollide().radius(20))
    .force(
      'x',
      d3.forceX<any>(d => typePositions[d.type]?.x || width / 2).strength(0.5)
    )
    .force(
      'y',
      d3.forceY<any>(d => typePositions[d.type]?.y || height / 2).strength(0.5)
    )

  // 타입별 배경 영역 표시
  g.append('g')
    .selectAll('rect')
    .data(types)
    .join('rect')
    .attr('x', (d, i) => cellWidth * (i % cols))
    .attr('y', (d, i) => cellHeight * Math.floor(i / cols))
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .attr('fill', d => getTypeColor(d))
    .attr('fill-opacity', 0.05)
    .attr('stroke', d => getTypeColor(d))
    .attr('stroke-opacity', 0.2)
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', '5,5')

  // 타입 레이블
  g.append('g')
    .selectAll('text')
    .data(types)
    .join('text')
    .attr('x', (d, i) => cellWidth * (i % cols) + 10)
    .attr('y', (d, i) => cellHeight * Math.floor(i / cols) + 20)
    .text(d => formatType(d))
    .attr('font-size', 14)
    .attr('font-weight', 600)
    .attr('fill', d => getTypeColor(d))
    .style('pointer-events', 'none')

  // 화살표 마커 정의
  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrowhead-cluster')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#999')

  // 엣지 그리기
  const link = g
    .append('g')
    .selectAll('line')
    .data(simulationEdges)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.3)
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#arrowhead-cluster)')

  // 노드 그리기
  const node = g
    .append('g')
    .selectAll('circle')
    .data(simulationNodes)
    .join('circle')
    .attr('r', d => {
      const size = Math.max(6, Math.min(15, 6 + d.importedBy.length))
      return size
    })
    .attr('fill', d => {
      if (d.importedBy.length === 0 && d.type !== 'page') {
        return '#9ca3af'
      }
      return getTypeColor(d.type)
    })
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(
      d3
        .drag<any, FileNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
    )
    .on('click', (event, d) => {
      selectedNode.value = d
    })
    .on('mouseover', function () {
      d3.select(this).attr('stroke', '#000').attr('stroke-width', 3)
    })
    .on('mouseout', function () {
      d3.select(this).attr('stroke', '#fff').attr('stroke-width', 2)
    })

  // 레이블 그리기
  const label = g
    .append('g')
    .selectAll('text')
    .data(simulationNodes)
    .join('text')
    .text(d => d.fileName)
    .attr('font-size', 9)
    .attr('dx', 10)
    .attr('dy', 3)
    .style('pointer-events', 'none')
    .style('user-select', 'none')

  // Simulation tick
  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)

    label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y)
  })

  // Drag functions
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: any, d: any) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
}

/**
 * Hierarchical Layout 렌더링 (계층 번들링)
 */
function renderHierarchicalLayout(nodes: FileNode[], edges: Edge[]) {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  // SVG 크기
  const container = svgRef.value.parentElement
  const width = container?.clientWidth || 1200
  const height = container?.clientHeight || 800

  svg.attr('width', width).attr('height', height)

  // 줌/팬 기능
  const g = svg.append('g')

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 4])
    .on('zoom', event => {
      g.attr('transform', event.transform)
    })

  svg.call(zoom as any)

  // 타입별 중심 위치 계산 (원형 배치)
  const types = Array.from(new Set(nodes.map(n => n.type)))
  const anglePerType = (Math.PI * 2) / types.length
  const radius = Math.min(width, height) / 3

  const typePositions: Record<string, { x: number; y: number }> = {}
  const centerX = width / 2
  const centerY = height / 2

  types.forEach((type, i) => {
    const angle = i * anglePerType
    typePositions[type] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  })

  // Force simulation with type clustering (계층적 배치)
  const simulationNodes = nodes.map(n => ({ ...n }))
  const simulationEdges = edges.map(e => ({ ...e }))

  const simulation = d3
    .forceSimulation(simulationNodes as any)
    .force(
      'link',
      d3
        .forceLink(simulationEdges as any)
        .id((d: any) => d.id)
        .distance(50)
        .strength(0.3)
    )
    .force('charge', d3.forceManyBody().strength(-80))
    .force('collision', d3.forceCollide().radius(20))
    .force(
      'x',
      d3.forceX<any>(d => typePositions[d.type]?.x || width / 2).strength(0.3)
    )
    .force(
      'y',
      d3.forceY<any>(d => typePositions[d.type]?.y || height / 2).strength(0.3)
    )

  // 원형 배경 영역 표시
  g.append('circle')
    .attr('cx', centerX)
    .attr('cy', centerY)
    .attr('r', radius + 50)
    .attr('fill', 'none')
    .attr('stroke', '#e5e7eb')
    .attr('stroke-dasharray', '5,5')
    .attr('stroke-width', 2)

  // 타입별 배경 섹터 표시
  types.forEach((type, i) => {
    const angle = i * anglePerType
    const nextAngle = (i + 1) * anglePerType
    const x1 = centerX + radius * Math.cos(angle)
    const y1 = centerY + radius * Math.sin(angle)
    const x2 = centerX + radius * Math.cos(nextAngle)
    const y2 = centerY + radius * Math.sin(nextAngle)

    g.append('line')
      .attr('x1', centerX)
      .attr('y1', centerY)
      .attr('x2', x1)
      .attr('y2', y1)
      .attr('stroke', getTypeColor(type))
      .attr('stroke-opacity', 0.1)
      .attr('stroke-width', 2)
  })

  // 타입 레이블
  g.append('g')
    .selectAll('text')
    .data(types)
    .join('text')
    .attr('x', (d, i) => {
      const angle = i * anglePerType
      return centerX + (radius + 70) * Math.cos(angle)
    })
    .attr('y', (d, i) => {
      const angle = i * anglePerType
      return centerY + (radius + 70) * Math.sin(angle)
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .text(d => formatType(d))
    .attr('font-size', 12)
    .attr('font-weight', 600)
    .attr('fill', d => getTypeColor(d))
    .style('pointer-events', 'none')

  // 화살표 마커 정의
  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrowhead-hierarchical')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#999')

  // 엣지 그리기
  const link = g
    .append('g')
    .selectAll('line')
    .data(simulationEdges)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.2)
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#arrowhead-hierarchical)')

  // 노드 그리기
  const node = g
    .append('g')
    .selectAll('circle')
    .data(simulationNodes)
    .join('circle')
    .attr('r', d => {
      const size = Math.max(6, Math.min(15, 6 + d.importedBy.length))
      return size
    })
    .attr('fill', d => {
      if (d.importedBy.length === 0 && d.type !== 'page') {
        return '#9ca3af'
      }
      return getTypeColor(d.type)
    })
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(
      d3
        .drag<any, FileNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
    )
    .on('click', (event, d) => {
      selectedNode.value = d
    })
    .on('mouseover', function () {
      d3.select(this).attr('stroke', '#000').attr('stroke-width', 3)
    })
    .on('mouseout', function () {
      d3.select(this).attr('stroke', '#fff').attr('stroke-width', 2)
    })

  // 레이블 그리기
  const label = g
    .append('g')
    .selectAll('text')
    .data(simulationNodes)
    .join('text')
    .text(d => d.fileName)
    .attr('font-size', 8)
    .attr('dx', 8)
    .attr('dy', 3)
    .style('pointer-events', 'none')
    .style('user-select', 'none')

  // Simulation tick
  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)

    label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y)
  })

  // Drag functions
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: any, d: any) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
}

/**
 * Force Layout 렌더링 (기존 방식)
 */
function renderForceLayout(nodes: FileNode[], edges: Edge[]) {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  // SVG 크기
  const container = svgRef.value.parentElement
  const width = container?.clientWidth || 1200
  const height = container?.clientHeight || 800

  svg.attr('width', width).attr('height', height)

  // 노드와 엣지 복사 (시뮬레이션이 원본을 수정하지 않도록)
  const simulationNodes = nodes.map(n => ({ ...n }))
  const simulationEdges = edges.map(e => ({ ...e }))

  // 줌/팬 기능
  const g = svg.append('g')

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 4])
    .on('zoom', event => {
      g.attr('transform', event.transform)
    })

  svg.call(zoom as any)

  // Force simulation
  const simulation = d3
    .forceSimulation(simulationNodes as any)
    .force(
      'link',
      d3
        .forceLink(simulationEdges as any)
        .id((d: any) => d.id)
        .distance(100)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(30))

  // 화살표 마커 정의
  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#999')

  // 엣지 그리기
  const link = g
    .append('g')
    .selectAll('line')
    .data(simulationEdges)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#arrowhead)')

  // 노드 그리기
  const node = g
    .append('g')
    .selectAll('circle')
    .data(simulationNodes)
    .join('circle')
    .attr('r', d => {
      // 크기는 의존하는 파일 수에 비례
      const size = Math.max(8, Math.min(20, 8 + d.importedBy.length * 2))
      return size
    })
    .attr('fill', d => {
      // 미사용 파일은 회색
      if (d.importedBy.length === 0 && d.type !== 'page') {
        return '#9ca3af'
      }
      return getTypeColor(d.type)
    })
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(
      d3
        .drag<any, FileNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
    )
    .on('click', (event, d) => {
      selectedNode.value = d
    })
    .on('mouseover', function (event, d) {
      d3.select(this).attr('stroke', '#000').attr('stroke-width', 3)
    })
    .on('mouseout', function (event, d) {
      d3.select(this).attr('stroke', '#fff').attr('stroke-width', 2)
    })

  // 레이블 그리기
  const label = g
    .append('g')
    .selectAll('text')
    .data(simulationNodes)
    .join('text')
    .text(d => d.fileName)
    .attr('font-size', 10)
    .attr('dx', 15)
    .attr('dy', 4)
    .style('pointer-events', 'none')
    .style('user-select', 'none')

  // Simulation tick
  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)

    label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y)
  })

  // Drag functions
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event: any, d: any) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
}

// 마운트 시 데이터 로드
onMounted(() => {
  fetchData()
})

// 반응형 리사이즈
onMounted(() => {
  const resizeObserver = new ResizeObserver(() => {
    if (analysisData.value) {
      renderGraph()
    }
  })

  if (svgRef.value?.parentElement) {
    resizeObserver.observe(svgRef.value.parentElement)
  }
})
</script>

<style scoped>
.dependency-map {
  padding: 20px;
  min-height: 100vh;
  background: #f9fafb;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.help-btn {
  padding: 10px 20px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.help-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.refresh-btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: #2563eb;
}

.refresh-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.help-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-left: 4px solid #3b82f6;
}

.help-section h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #111827;
}

.help-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.help-item {
  font-size: 14px;
  color: #374151;
}

.help-item strong {
  display: block;
  font-size: 15px;
  color: #111827;
  margin-bottom: 8px;
}

.help-item p {
  margin: 8px 0;
  line-height: 1.6;
}

.help-item ul {
  margin: 8px 0;
  padding-left: 20px;
  line-height: 1.8;
}

.help-item code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 13px;
  color: #1f2937;
}

.color-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin: 4px 4px 4px 0;
}

.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-card.warning {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
}

.stat-card.danger {
  background: #fee2e2;
  border-left: 4px solid #ef4444;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
}

.controls {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.search-box {
  margin-bottom: 12px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.filters {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.filter-label {
  font-weight: 600;
  color: #374151;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.filter-item input[type='checkbox'] {
  cursor: pointer;
}

.view-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.layout-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  margin-top: 12px;
}

.warnings {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.warning-section {
  margin-bottom: 16px;
}

.warning-section:last-child {
  margin-bottom: 0;
}

.warning-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.warning-description {
  font-size: 14px;
  color: #6b7280;
  margin: 8px 0 12px;
  line-height: 1.6;
}

.warning-description small {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.warning-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #4b5563;
}

.warning-list li {
  padding: 4px 0;
  font-family: monospace;
}

.stat-card {
  cursor: help;
}

.graph-container {
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 800px;
  overflow: hidden;
}

.graph-svg {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fee2e2;
  color: #991b1b;
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.detail-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.detail-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #111827;
}

.detail-content {
  padding: 16px;
  max-height: calc(80vh - 60px);
  overflow-y: auto;
}

.detail-content p {
  margin: 8px 0;
  font-size: 14px;
}

.detail-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.detail-section h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  font-family: monospace;
}

.detail-section li {
  padding: 4px 0;
  color: #4b5563;
  word-break: break-all;
}

.empty-message {
  font-size: 13px;
  color: #9ca3af;
  font-style: italic;
}
</style>
