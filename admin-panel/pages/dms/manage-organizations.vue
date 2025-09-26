<template>
  <TitleArea title="조직 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38" @click="openModal('headquarters')">
          <div v-html="addSvg"></div>
          신규 본부 추가
        </Button>
        <Button variant="blue" :size="38" @click="openModal('group')">
          <div v-html="addSvg"></div>
          신규 그룹 추가
        </Button>
        <Button variant="blue" :size="38" @click="openModal('team')">
          <div v-html="addSvg"></div>
          신규 팀 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <div v-if="isLoading" class="loading-container">
      <Loading />
    </div>
    <div v-else class="org-tree" id="orgTree">
      <div
        v-for="headquarters in organizations"
        :key="headquarters.id"
        class="org-item"
        :data-id="headquarters.id"
        data-type="headquarters"
      >
        <div class="org-content org-headquarters">
          <div class="org-info">
            <span class="org-icon"><div v-html="officeSvg"></div></span>
            <span class="org-name">{{ headquarters.name }}</span>
          </div>
          <div class="org-actions">
            <Button
              variant="text"
              :size="20"
              @click="editOrganization('headquarters', headquarters)"
            >
              <div v-html="modifySvg"></div>
              수정
            </Button>
            <Button
              variant="text"
              :size="20"
              @click="deleteOrganization('headquarters', headquarters)"
            >
              <div v-html="deleteSvg"></div>
              삭제
            </Button>
          </div>
        </div>
        <div class="org-children" v-if="headquarters.groups.length > 0">
          <div
            v-for="group in headquarters.groups"
            :key="group.id"
            class="org-item"
            :data-id="group.id"
            data-type="group"
          >
            <div class="org-content org-group">
              <div class="org-info">
                <span class="org-icon"></span>
                <span class="org-name">{{ group.name }}</span>
              </div>
              <div class="org-actions">
                <Button
                  variant="text"
                  :size="20"
                  @click="editOrganization('group', group)"
                >
                  <div v-html="modifySvg"></div>
                  수정
                </Button>
                <Button
                  variant="text"
                  :size="20"
                  @click="deleteOrganization('group', group)"
                >
                  <div v-html="deleteSvg"></div>
                  삭제
                </Button>
              </div>
            </div>
            <div class="org-children" v-if="group.teams.length > 0">
              <div
                v-for="team in group.teams"
                :key="team.id"
                class="org-item"
                :data-id="team.id"
                data-type="team"
              >
                <div class="org-content org-team">
                  <div class="org-info">
                    <span class="org-icon"></span>
                    <span class="org-name">{{ team.name }}</span>
                  </div>
                  <div class="org-actions">
                    <Button
                      variant="text"
                      :size="20"
                      @click="editOrganization('team', team)"
                    >
                      <div v-html="modifySvg"></div>
                      수정
                    </Button>
                    <Button
                      variant="text"
                      :size="20"
                      @click="deleteOrganization('team', team)"
                    >
                      <div v-html="deleteSvg"></div>
                      삭제
                    </Button>
                  </div>
                  <div class="org-count">
                    <span>총</span>
                    <strong>{{ team.employees?.length || 0 }}</strong
                    >명
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentsArea>

  <!-- 조직 추가/수정 모달 -->
  <OrganizationModal
    :isOpen="modal.isOpen"
    :organizationType="modal.type"
    :editData="modal.editData"
    @close="closeModal"
    @success="handleModalSuccess"
  />

  <!-- 삭제 확인 모달 -->
  <ConfirmModal
    :isOpen="deleteModal.isOpen"
    :title="deleteModal.title"
    :message="deleteModal.message"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>

<script setup>
import officeSvg from '~/components/assets/dms/icons/office.svg?raw'
import modifySvg from '~/components/assets/dms/icons/modify.svg?raw'
import deleteSvg from '~/components/assets/dms/icons/delete.svg?raw'
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import Loading from '~/components/ui/Loading.vue'
import OrganizationModal from '~/components/dms/OrganizationModal.vue'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import { useYear } from '~/composables/useYear'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 연도 관련 로직
const { selectedYear, yearOptions, setSelectedYear, resetToCurrentYear } =
  useYear()

// 페이지 로드 시 올해로 리셋
onMounted(() => {
  resetToCurrentYear()
  loadOrganizations()
})

// 연도 변경 핸들러
const handleYearChange = year => {
  setSelectedYear(year)
}

// 데이터 상태
const organizations = ref([])
const isLoading = ref(false)

// 모달 상태
const modal = ref({
  isOpen: false,
  type: 'headquarters',
  editData: null,
})

// 삭제 모달 상태
const deleteModal = ref({
  isOpen: false,
  type: '',
  data: null,
  title: '',
  message: '',
})

// 조직 데이터 로드
const loadOrganizations = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/dms/organizations/headquarters')
    if (response.success) {
      organizations.value = response.data
    }
  } catch (error) {
    console.error('Error loading organizations:', error)
  } finally {
    isLoading.value = false
  }
}

// 모달 열기
const openModal = (type, editData = null) => {
  modal.value = {
    isOpen: true,
    type,
    editData,
  }
}

// 모달 닫기
const closeModal = () => {
  modal.value = {
    isOpen: false,
    type: 'headquarters',
    editData: null,
  }
}

// 모달 성공 처리
const handleModalSuccess = data => {
  loadOrganizations() // 데이터 새로고침
  closeModal()
}

// 조직 수정
const editOrganization = (type, data) => {
  openModal(type, data)
}

// 조직 삭제
const deleteOrganization = (type, data) => {
  const typeNames = {
    headquarters: '본부',
    group: '그룹',
    team: '팀',
  }

  deleteModal.value = {
    isOpen: true,
    type,
    data,
    title: `${typeNames[type]} 삭제`,
    message: `"${data.name}" ${typeNames[type]}을(를) 삭제하시겠습니까?`,
  }
}

// 삭제 확인
const confirmDelete = async () => {
  try {
    const { type, data } = deleteModal.value
    const endpoint = getDeleteEndpoint(type)

    const response = await $fetch(`${endpoint}/${data.id}`, {
      method: 'DELETE',
    })

    if (response.success) {
      await loadOrganizations() // 데이터 새로고침
      cancelDelete()
    }
  } catch (error) {
    console.error('Error deleting organization:', error)
    // 에러 처리
  }
}

// 삭제 취소
const cancelDelete = () => {
  deleteModal.value = {
    isOpen: false,
    type: '',
    data: null,
    title: '',
    message: '',
  }
}

// 삭제 엔드포인트 가져오기
const getDeleteEndpoint = type => {
  const endpoints = {
    headquarters: '/api/dms/organizations/headquarters',
    group: '/api/dms/organizations/groups',
    team: '/api/dms/organizations/teams',
  }
  return endpoints[type]
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

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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
