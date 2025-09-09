<template>
  <TitleArea title="조직 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38">
          <div v-html="addSvg"></div>
          신규 그룹 추가
        </Button>
        <Button variant="blue" :size="38">
          <div v-html="addSvg"></div>
          신규 팀 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <div class="org-tree" id="orgTree">
      <div class="org-item" data-id="1" data-type="headquarters">
        <div class="org-content org-headquarters">
          <div class="org-info">
            <span class="org-icon"><div v-html="officeSvg"></div></span>
            <span class="org-name">CiX 본부</span>
          </div>
          <div class="org-actions">
            <Button
              variant="text"
              :size="20"
              @click="editOrganization('headquarters', 1)"
            >
              <div v-html="modifySvg"></div>
              수정
            </Button>
            <Button
              variant="text"
              :size="20"
              @click="deleteOrganization('headquarters', 1)"
            >
              <div v-html="deleteSvg"></div>
              삭제
            </Button>
          </div>
          <div class="org-count">2개 그룹</div>
        </div>
        <div class="org-children">
          <div class="org-item" data-id="1" data-type="group">
            <div class="org-content org-group">
              <div class="org-info">
                <span class="org-icon"></span>
                <span class="org-name">UX/UI 그룹</span>
              </div>
              <div class="org-actions">
                <Button
                  variant="text"
                  :size="20"
                  @click="editOrganization('group', 1)"
                >
                  <div v-html="modifySvg"></div>
                  수정
                </Button>
                <Button
                  variant="text"
                  :size="20"
                  @click="deleteOrganization('group', 1)"
                >
                  <div v-html="deleteSvg"></div>
                  삭제
                </Button>
              </div>
              <div class="org-count">3개 팀</div>
            </div>
            <div class="org-children">
              <div class="org-item" data-id="20" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">PMO 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 20)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 20)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>12</strong>명
                  </div>
                </div>
              </div>
              <div class="org-item" data-id="1" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">UX/UI 1 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 1)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 1)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>42</strong>명
                  </div>
                </div>
              </div>
              <div class="org-item" data-id="2" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">UX/UI 2 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 2)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 2)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>33</strong>명
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="org-item" data-id="5" data-type="group">
            <div class="org-content org-group">
              <div class="org-info">
                <span class="org-icon"></span>
                <span class="org-name">콘텐츠 그룹</span>
              </div>
              <div class="org-actions">
                <Button
                  variant="text"
                  :size="20"
                  @click="editOrganization('group', 5)"
                >
                  <div v-html="modifySvg"></div>
                  수정
                </Button>
                <Button
                  variant="text"
                  :size="20"
                  @click="deleteOrganization('group', 5)"
                >
                  <div v-html="deleteSvg"></div>
                  삭제
                </Button>
              </div>
              <div class="org-count">5개 팀</div>
            </div>
            <div class="org-children">
              <div class="org-item" data-id="25" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">콘텐츠 1 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 25)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 25)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>0</strong>명
                  </div>
                </div>
              </div>
              <div class="org-item" data-id="26" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">콘텐츠 2 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 26)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 26)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>0</strong>명
                  </div>
                </div>
              </div>
              <div class="org-item" data-id="27" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">콘텐츠 3 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 27)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 27)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>0</strong>명
                  </div>
                </div>
              </div>
              <div class="org-item" data-id="28" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">콘텐츠 4 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 28)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 28)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>0</strong>명
                  </div>
                </div>
              </div>
              <div class="org-item" data-id="29" data-type="team">
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">콘텐츠 5 팀</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', 29)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', 29)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span> <strong>0</strong>명
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentsArea>
</template>

<script setup>
import officeSvg from '~/components/assets/delivery/icons/office.svg?raw'
import modifySvg from '~/components/assets/delivery/icons/modify.svg?raw'
import deleteSvg from '~/components/assets/delivery/icons/delete.svg?raw'
import addSvg from '~/components/assets/delivery/icons/add.svg?raw'
import TitleArea from '~/components/delivery/TitleArea.vue'
import ContentsArea from '~/components/delivery/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import { useYear } from '~/composables/useYear'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'delivery',
})

// 연도 관련 로직

// 페이지 로드 시 올해로 리셋
onMounted(() => {
  resetToCurrentYear()
})
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } =
  useYear()

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
}

// 테이블 데이터
const tableHeaders = [
  { key: 'department', label: '부서명' },
  { key: 'manager', label: '부서장' },
  { key: 'employeeCount', label: '직원 수' },
  { key: 'budget', label: '예산' },
  { key: 'status', label: '상태' },
  { key: 'actions', label: '작업' },
]

const tableData = ref([
  {
    department: '개발팀',
    manager: '김철수',
    employeeCount: 25,
    budget: '₩500M',
    status: '활성',
    actions: '관리',
  },
  {
    department: '마케팅팀',
    manager: '이영희',
    employeeCount: 12,
    budget: '₩200M',
    status: '활성',
    actions: '관리',
  },
])

const isLoading = ref(false)

// 조직 관리 함수들
const editOrganization = (type, id) => {
  console.log(`편집: ${type} ID ${id}`)
  // TODO: 편집 모달 또는 페이지로 이동
}

const deleteOrganization = (type, id) => {
  console.log(`삭제: ${type} ID ${id}`)
  // TODO: 삭제 확인 모달 표시
}
</script>

<style lang="scss" scoped>
.center-content {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #374151;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

// 조직도 트리 스타일
.org-tree {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  width: 100%;
  padding: 0;

  .org-item {
    width: 100%;
    overflow: hidden;
    border: 1px solid #cbcbcb;
    border-radius: 16px;
    &[data-type='headquarters'] {
      background: #fafafa;
    }
    &[data-type='group'] {
      background: #fff;
    }
  }

  .org-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .org-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .org-name {
    font-weight: 700;
    color: #000;
  }

  .org-count {
    display: none;
  }

  .org-actions {
    display: flex;
    gap: 20px;
    button {
      color: black;
      background: transparent;
    }
  }

  // 타입별 스타일
  .org-headquarters {
    padding: 24px;
    .org-name {
      color: #000;
      font-size: 18px;
      line-height: 24px;
    }
    .org-icon {
      width: 24px;
      height: 24px;
      text-align: center;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    + .org-children {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px 24px;
      background: #fff;
      border-top: 1px solid #cbcbcb;
    }
  }

  .org-group {
    padding: 24px;
    .org-name {
      color: #222;
      font-size: 16px;
      line-height: 22px;
    }
    .org-icon {
      display: none;
    }
    + .org-children {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 0 24px 24px 24px;
      background: #fff;
      .org-item {
        border: 0;
        width: calc((100% - 20px * 3) / 4);
        @media (max-width: 1800px) {
          width: calc((100% - 20px * 2) / 3);
        }
        @media (max-width: 1500px) {
          width: calc((100% - 20px * 1) / 2);
        }
        @media (max-width: 1200px) {
          width: 100%;
        }
      }
    }
  }

  .org-team {
    padding: 16px 20px;
    border-radius: 12px;
    background: #f7f7f7;
    .org-name {
      color: #3c3c3c;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
    }
    .org-count {
      display: flex;
      min-width: 100%;
      padding: 20px;
      justify-content: center;
      align-items: center;
      color: #222;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      border-radius: 10px;
      background: #fff;
      span {
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        padding: 0 4px 0 0;
        color: #666;
      }
    }
    .org-actions {
      opacity: 0.95;
      gap: 16px;
      button {
        color: #666;
      }
    }
  }
}
</style>
