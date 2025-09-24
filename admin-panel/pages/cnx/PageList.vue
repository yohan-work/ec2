<template>
  <div class="page-list-container">
    <div class="header">
      <h1>CNX페이지 관리</h1>
    </div>
    
    <div class="table-container">
      <table class="page-table">
        <caption class="table-caption">
          프로젝트 페이지 목록 및 작업 현황 <br>
          (폴더경로 등 자유롭게 수정 가능합니다.)
        </caption>
        <thead>
          <tr>
            <th>Depth1</th>
            <th>Depth2</th>
            <th>Depth3</th>
            <th>File Name</th>
            <th>최초작업일</th>
            <th>수정일</th>
            <th>담당자</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(page, index) in flattenedPages" :key="`page-${index}`">
            <!-- Depth1 셀 - 첫 번째 depth2의 첫 번째 depth3에서만 rowspan 표시 -->
            <td v-if="page.isFirstDepth2FirstDepth3" 
                :rowspan="getDepth1Rowspan(pages[page.depth1Index])" 
                class="depth1-cell">
              {{ page.depth1 }}
            </td>
            
            <!-- Depth2 셀 - 첫 번째 depth3에서만 rowspan 표시 -->
            <td v-if="page.isFirstDepth3" 
                :rowspan="page.hasDepth2 ? getDepth2Rowspan(page.depth1Index, page.depth2Index) : 1" 
                class="depth2-cell">
              {{ page.depth2 || '-'  }}
            </td>
            
            <!-- Depth3 셀 -->
            <td class="depth3-cell">{{ page.depth3 || '-' }}</td>
            
            <!-- 나머지 셀들 -->
            <td class="link-cell">
              <NuxtLink :to="page.filePath || page.path">{{ page.path || '-' }}</NuxtLink>
            </td>
            <td>{{ page.createdAt || '작업예정'  }}</td>
            <td>{{ page.updatedAt || '-' }}</td>
            <td>{{ page.updatedBy || '미정' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 페이지 데이터 (유연한 계층 구조 - 1단계, 2단계, 3단계 지원)
const pages = ref([
  {
    title: 'Style guide',
    path: 'Styleguide',
    filePath: '/style-guide',
    createdAt: '',
    updatedAt: '',
    updatedBy: '김미경 차장'
  },
  {
    title: 'Layout',
    children: [
      {
        title: 'Header',
        path: 'Header',
        filePath: '/layout/header',
        createdAt: '',
        updatedAt: '',
        updatedBy: '김미경 차장'
      },
      {
        title: 'Footer',
        path: 'Footer',
        filePath: '/layout/footer',
        createdAt: '',
        updatedAt: '',
        updatedBy: '김미경 차장'
      },
      {
        title: 'Side Nav',
        path: 'SideNav',
        filePath: '/layout/side-nav',
        createdAt: '',
        updatedAt: '',
        updatedBy: '김미경 차장'
      },
    ]
  },
  {
    title: 'Main',
    path: 'Main',
    filePath: '/main',
    createdAt: '',
    updatedAt: '',
    updatedBy: '김미경 차장'
  },
  {
    title: 'What We Do',
    children: [
      {
        title: 'Strategy',
        path: 'Strategy',
        filePath: '/what-we-do/strategy',
        createdAt: '',
        updatedAt: '',
        updatedBy: '김미경 차장'
      },
      {
        title: 'Analytics',
        path: 'Analytics',
        filePath: '/what-we-do/analytics',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Analytics Solution',
        path: 'Analytics Solution',
        filePath: '/what-we-do/analytics-solution',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Technology Platforms',
        path: 'Technology Platforms',
        filePath: '/what-we-do/technology-platforms',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Technology Services',
        path: 'Technology Services',
        filePath: '/what-we-do/technology-services',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Operation',
        path: 'Operation',
        filePath: '/what-we-do/operation',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Operation',
        path: 'Operation',
        filePath: '/what-we-do/operation',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Contents And Design',
        path: 'Contents And Design',
        filePath: '/what-we-do/contents-and-design',
        createdAt: '',
        updatedAt: '',
        updatedBy: '박승주 사원'
      },
      {
        title: 'Digital Advertising',
        path: 'Digital Advertising',
        filePath: '/what-we-do/digital-advertising',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      },
      {
        title: 'Cx Operations',
        path: 'Cx Operations',
        filePath: '/what-we-do/cx-operations',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      }
    ]
  },
  {
    title: 'About Us',
    children: [
      {
        title: 'About Us',
        path: 'About Us',
        filePath: '/about-us/about-us',
        createdAt: '',
        updatedAt: '',
        updatedBy: '박승주 사원'
      },
      {
        title: 'Newsletters',
        children: [
          {
            title: 'List',
            path: 'List',
            filePath: '/cnx/newsletters/',
            createdAt: '',
            updatedAt: '',
            updatedBy: '박승주 사원'
          },
          {
            title: 'Detail',
            path: 'Detail',
            filePath: '/cnx/newsletters/',
            createdAt: '',
            updatedAt: '',
            updatedBy: '박승주 사원'
          }
        ]
      }
    ]
  },
  {
    title: 'Careers',
    children: [
      {
        title: 'Catalyst',
        path: 'Catalyst',
        filePath: '/careers/catalyst',
        createdAt: '',
        updatedAt: '',
        updatedBy: '박승주 사원'
      },
      {
        title: 'Customer Service',
        children: [
          {
            title: 'Agent',
            path: 'Agent',
            filePath: '/careers/customer-service/agent',
            createdAt: '',
            updatedAt: '',
            updatedBy: '박승주 사원'
          },
          {
            title: 'Non Agent',
            path: 'Non Agent',
            filePath: '/careers/customer-service/non-agent',
            createdAt: '',
            updatedAt: '',
            updatedBy: '박승주 사원'
          }
        ]
      }
    ]
  },
  {
    title: 'Contact us',
    path: 'Contact us',
    filePath: '/contact-us',
    createdAt: '',
    updatedAt: '',
    updatedBy: '김미경 차장'
  }
])

// Depth1의 rowspan 계산 함수 (유연한 구조 지원 - 1단계, 2단계, 3단계)
const getDepth1Rowspan = (depth1) => {
  // depth1에 직접 페이지 정보가 있는 경우 (1단계 구조)
  if (depth1.path) {
    return 1
  }
  
  // depth1에 children이 있는 경우 (2단계 또는 3단계 구조)
  let totalRows = 0
  depth1.children.forEach(depth2 => {
    if (depth2.path) {
      // depth2에 직접 페이지 정보가 있는 경우
      totalRows += 1
    } else if (depth2.children) {
      // depth2에 children이 있는 경우
      totalRows += depth2.children.length
    }
  })
  return totalRows
}

// Depth2의 rowspan 계산 함수 (1단계 구조에서는 사용되지 않음)
const getDepth2Rowspan = (depth1Index, depth2Index) => {
  const depth1 = pages.value[depth1Index]
  
  // depth1에 직접 페이지 정보가 있는 경우 (1단계 구조) - depth2가 없으므로 0
  if (depth1.path) {
    return 0
  }
  
  const depth2 = depth1.children[depth2Index]
  if (depth2.path) {
    // depth2에 직접 페이지 정보가 있는 경우
    return 1
  } else if (depth2.children) {
    // depth2에 children이 있는 경우
    return depth2.children.length
  }
  return 1
}

// 계층 구조를 평면화한 데이터 (유연한 구조 지원 - 1단계, 2단계, 3단계)
const flattenedPages = computed(() => {
  const result = []
  pages.value.forEach((depth1, depth1Index) => {
    // depth1에 직접 페이지 정보가 있는 경우 (1단계 구조)
    if (depth1.path) {
        result.push({
          depth1: depth1.title,
          depth2: '', // depth2가 없는 경우 빈 문자열
          depth3: '', // depth3가 없는 경우 빈 문자열
          path: depth1.path,
          filePath: depth1.filePath,
          createdAt: depth1.createdAt,
          updatedAt: depth1.updatedAt,
          updatedBy: depth1.updatedBy,
          depth1Index,
          depth2Index: 0,
          depth3Index: 0,
          isFirstDepth2: true, // depth1이 직접 페이지인 경우 항상 첫 번째
          isFirstDepth3: true, // depth1이 직접 페이지인 경우 항상 첫 번째
          isFirstDepth2FirstDepth3: true,
          hasDepth2: false,
          hasDepth3: false
        })
    } else if (depth1.children) {
      // depth1에 children이 있는 경우 (2단계 또는 3단계 구조)
      depth1.children.forEach((depth2, depth2Index) => {
        // depth2에 직접 페이지 정보가 있는 경우 (2단계 구조)
        if (depth2.path) {
          result.push({
            depth1: depth1.title,
            depth2: depth2.title,
            depth3: '', // depth3가 없는 경우 빈 문자열
            path: depth2.path,
            filePath: depth2.filePath,
            createdAt: depth2.createdAt,
            updatedAt: depth2.updatedAt,
            updatedBy: depth2.updatedBy,
            depth1Index,
            depth2Index,
            depth3Index: 0,
            isFirstDepth2: depth2Index === 0,
            isFirstDepth3: true, // depth2가 직접 페이지인 경우 항상 첫 번째
            isFirstDepth2FirstDepth3: depth2Index === 0,
            hasDepth2: true,
            hasDepth3: false
          })
        } else if (depth2.children) {
          // depth2에 children이 있는 경우 (3단계 구조)
          depth2.children.forEach((depth3, depth3Index) => {
            result.push({
              depth1: depth1.title,
              depth2: depth2.title,
              depth3: depth3.title,
              path: depth3.path,
              filePath: depth3.filePath,
              createdAt: depth3.createdAt,
              updatedAt: depth3.updatedAt,
              updatedBy: depth3.updatedBy,
              depth1Index,
              depth2Index,
              depth3Index,
              isFirstDepth2: depth2Index === 0,
              isFirstDepth3: depth3Index === 0,
              isFirstDepth2FirstDepth3: depth2Index === 0 && depth3Index === 0,
              hasDepth2: true,
              hasDepth3: true
            })
          })
        }
      })
    }
  })
  return result
})

</script>

<style lang="scss" scoped>
.page-list-container {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .table-container {
    @media (max-width: 1200px) {
      overflow-x: auto;
    }
  }

  .page-table {
    width: 100%;
    min-width: 1200px;
    border-collapse: collapse;
    margin-top: 20px;
    
    th,
    td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
      vertical-align: top;
    }

    thead {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .depth1-cell {
      background-color: #e8f4fd;
      font-weight: bold;
      text-align: center;
      vertical-align: middle;
    }

    .depth2-cell {
      background-color: #f0f8ff;
      font-weight: 600;
      text-align: center;
      vertical-align: middle;
    }

    .depth3-cell {
      background-color: #fafafa;
      font-weight: 500;
    }

    .link-cell {
      a {
        color: #007bff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .table-caption {
    caption-side: top;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
    padding: 8px 0;
  }
}
</style>
