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
    <EmptyContainer
      v-else-if="organizations.length === 0"
      message="등록된 조직이 없습니다."
    />
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
  <Modal
    :show="modal.isOpen"
    :title="modalTitle"
    :width="'442px'"
    @close="closeModal"
  >
    <form
      @submit.prevent="handleOrganizationFormSubmit"
      class="organization-form"
    >
      <div class="form-group">
        <label class="form-label">
          {{
            modal.type === 'headquarters'
              ? '본부명'
              : modal.type === 'group'
                ? '그룹명'
                : '팀명'
          }}
          <span class="required">*</span>
        </label>
        <Input
          v-model="organizationForm.name"
          :placeholder="`${modal.type === 'headquarters' ? '본부' : modal.type === 'group' ? '그룹' : '팀'}명을 입력하세요`"
          :error="organizationFormErrors.name"
        />
      </div>

      <!-- 본부 선택 (그룹, 팀 추가 시) -->
      <div
        v-if="modal.type === 'group' || modal.type === 'team'"
        class="form-group"
      >
        <label class="form-label">
          소속 본부
          <span class="required">*</span>
        </label>
        <Select
          v-model="organizationForm.headquarters_id"
          :options="headquartersOptions"
          placeholder="본부를 선택하세요"
          :error="organizationFormErrors.headquarters_id"
          @change="handleHeadquartersChange"
        />
      </div>

      <!-- 그룹 선택 (팀 추가 시) -->
      <div v-if="modal.type === 'team'" class="form-group">
        <label class="form-label">
          소속 그룹
          <span class="required">*</span>
        </label>
        <Select
          v-model="organizationForm.group_id"
          :options="groupOptions"
          placeholder="그룹을 선택하세요"
          :error="organizationFormErrors.group_id"
        />
      </div>

      <!-- 리더 선택 -->
      <div class="form-group">
        <label class="form-label">리더</label>
        <Select
          v-model="organizationForm.leader_id"
          :options="leaderOptions"
          placeholder="리더를 선택하세요 (선택사항)"
        />
      </div>

      <!-- 정렬 순서 -->
      <div class="form-group">
        <label class="form-label">정렬 순서</label>
        <Input
          v-model.number="organizationForm.sort_order"
          type="number"
          placeholder="정렬 순서를 입력하세요"
          :error="organizationFormErrors.sort_order"
        />
      </div>
    </form>

    <template #footer>
      <div class="form-actions">
        <Button type="button" variant="secondary" @click="closeModal">
          취소
        </Button>
        <Button
          type="submit"
          variant="blue"
          :disabled="isOrganizationFormSubmitting"
          @click="handleOrganizationFormSubmit"
        >
          {{
            isOrganizationFormSubmitting
              ? '처리 중...'
              : isEditMode
                ? '수정'
                : '등록'
          }}
        </Button>
      </div>
    </template>
  </Modal>

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
import EmptyContainer from '~/components/dms/EmptyContainer.vue'
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Modal from '~/components/ui/Modal.vue'
import Loading from '~/components/ui/Loading.vue'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'
import { useYear } from '~/composables/useYear'
import { onMounted, ref, reactive, computed, watch } from 'vue'

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

// 조직 폼 관련
const isOrganizationFormSubmitting = ref(false)
const isEditMode = ref(false)

// 모달 제목
const modalTitle = computed(() => {
  const typeNames = {
    headquarters: '본부',
    group: '그룹',
    team: '팀',
  }
  return `${isEditMode.value ? '수정' : '신규'} ${typeNames[modal.value.type]} ${isEditMode.value ? '' : '등록'}`
})

// 조직 폼 데이터
const organizationForm = reactive({
  name: '',
  headquarters_id: null,
  group_id: null,
  leader_id: null,
  sort_order: 0,
})

// 조직 폼 에러
const organizationFormErrors = reactive({
  name: '',
  headquarters_id: '',
  group_id: '',
  sort_order: '',
})

// 옵션 데이터
const headquartersOptions = ref([])
const groupOptions = ref([])
const leaderOptions = ref([])

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

// 옵션 데이터 로드
const loadHeadquarters = async () => {
  try {
    const response = await $fetch('/api/dms/organizations/headquarters')
    if (response.success) {
      headquartersOptions.value = response.data.map(hq => ({
        value: hq.id,
        label: hq.name,
      }))
    }
  } catch (error) {
    console.error('Error loading headquarters:', error)
  }
}

const loadGroups = async headquartersId => {
  try {
    const response = await $fetch(
      `/api/dms/organizations/groups?headquarters_id=${headquartersId}`
    )
    if (response.success) {
      groupOptions.value = response.data.map(group => ({
        value: group.id,
        label: group.name,
      }))
    }
  } catch (error) {
    console.error('Error loading groups:', error)
  }
}

const loadLeaders = async () => {
  try {
    const response = await $fetch('/api/dms/employees?is_people_manager=true')
    if (response.success) {
      leaderOptions.value = response.data.map(emp => ({
        value: emp.id,
        label: `${emp.name} (${emp.email})`,
      }))
    }
  } catch (error) {
    console.error('Error loading leaders:', error)
  }
}

// 본부 변경 핸들러
const handleHeadquartersChange = async headquartersId => {
  organizationForm.group_id = null
  if (headquartersId) {
    await loadGroups(headquartersId)
  } else {
    groupOptions.value = []
  }
}

// 폼 초기화
const resetOrganizationForm = () => {
  Object.assign(organizationForm, {
    name: '',
    headquarters_id: null,
    group_id: null,
    leader_id: null,
    sort_order: 0,
  })
  Object.assign(organizationFormErrors, {
    name: '',
    headquarters_id: '',
    group_id: '',
    sort_order: '',
  })
}

// 조직 데이터로 폼 채우기
const fillOrganizationForm = data => {
  if (data) {
    Object.assign(organizationForm, {
      name: data.name || '',
      headquarters_id: data.headquarters_id || null,
      group_id: data.group_id || null,
      leader_id: data.leader_id || null,
      sort_order: data.sort_order || 0,
    })
  }
}

// 폼 검증
const validateOrganizationForm = () => {
  Object.assign(organizationFormErrors, {
    name: '',
    headquarters_id: '',
    group_id: '',
    sort_order: '',
  })

  if (!organizationForm.name.trim()) {
    organizationFormErrors.name = `${modal.value.type === 'headquarters' ? '본부' : modal.value.type === 'group' ? '그룹' : '팀'}명을 입력해주세요`
  }

  if (modal.value.type === 'group' || modal.value.type === 'team') {
    if (!organizationForm.headquarters_id) {
      organizationFormErrors.headquarters_id = '소속 본부를 선택해주세요'
    }
  }

  if (modal.value.type === 'team') {
    if (!organizationForm.group_id) {
      organizationFormErrors.group_id = '소속 그룹을 선택해주세요'
    }
  }

  return Object.values(organizationFormErrors).every(error => !error)
}

// 폼 제출
const handleOrganizationFormSubmit = async () => {
  if (!validateOrganizationForm()) return

  isOrganizationFormSubmitting.value = true

  try {
    const endpoint = getEndpoint()
    const method = isEditMode.value ? 'PUT' : 'POST'
    const url = isEditMode.value
      ? `${endpoint}/${modal.value.editData.id}`
      : endpoint

    const response = await $fetch(url, {
      method,
      body: organizationForm,
    })

    if (response.success) {
      await loadOrganizations() // 데이터 새로고침
      closeModal()
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    // 에러 처리
  } finally {
    isOrganizationFormSubmitting.value = false
  }
}

// API 엔드포인트 가져오기
const getEndpoint = () => {
  const endpoints = {
    headquarters: '/api/dms/organizations/headquarters',
    group: '/api/dms/organizations/groups',
    team: '/api/dms/organizations/teams',
  }
  return endpoints[modal.value.type]
}

// 모달 열기
const openModal = async (type, editData = null) => {
  modal.value = {
    isOpen: true,
    type,
    editData,
  }

  // 모달이 열릴 때 데이터 로드
  resetOrganizationForm()
  await loadHeadquarters()
  await loadLeaders()

  if (editData) {
    isEditMode.value = true
    fillOrganizationForm(editData)
    if (organizationForm.headquarters_id) {
      await loadGroups(organizationForm.headquarters_id)
    }
  } else {
    isEditMode.value = false
  }
}

// 모달 닫기
const closeModal = () => {
  modal.value = {
    isOpen: false,
    type: 'headquarters',
    editData: null,
  }
  resetOrganizationForm()
  isEditMode.value = false
}

// 모달 성공 처리 (기존 함수 유지)
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

// 조직 폼 스타일
.organization-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  line-height: 20px;
}

.required {
  color: #ef4444;
  margin-left: 2px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
</style>
