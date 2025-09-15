<template>
  <TitleArea title="직원 관리">
    <template #right>
      <div class="right-content">
        <Button variant="blue" :size="38">
          <div v-html="addSvg"></div>
          신규 직원 추가
        </Button>
      </div>
    </template>
  </TitleArea>
  <ContentsArea>
    <MainContainer>
      <div class="filter-container">
        <Input type="text" placeholder="이름/이메일 검색" />
        <Select
          v-model="selectedGroup"
          :options="groupOptions"
          placeholder="전체 그룹"
        />
        <Select
          v-model="selectedTeam"
          :options="teamOptions"
          placeholder="전체 팀"
        />
        <Select
          v-model="selectedJob"
          :options="jobOptions"
          placeholder="전체 직무"
        />
        <Select
          v-model="selectedCl"
          :options="clOptions"
          placeholder="전체 직급"
        />
        <Select
          v-model="selectedStatus"
          :options="statusOptions"
          placeholder="전체 상태"
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>이름</th>
            <th>그룹</th>
            <th>팀</th>
            <th>매니저</th>
            <th>직무</th>
            <th>직급(CL)</th>
            <th>이메일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>김철수</td>
            <td>개발팀</td>
            <td>팀장</td>
            <td>매니저</td>
            <td>직무</td>
            <td>직급(CL)</td>
            <td>이메일</td>
            <td>상태</td>
            <td>관리</td>
          </tr>
        </tbody>
      </Table>
    </MainContainer>
  </ContentsArea>
</template>

<script setup>
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import MainContainer from '~/components/dms/MainContainer.vue'
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Select from '~/components/ui/Select.vue'
import Table from '~/components/ui/Table.vue'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  width: calc(100% + 15px);
}
</style>
