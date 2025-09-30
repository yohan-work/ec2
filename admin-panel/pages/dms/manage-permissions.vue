<template>
  <TitleArea title="권한 관리"> </TitleArea>
  <ContentsArea>
    <div class="permission-tree">
      <PermissionCard
        id="20"
        position="본부장"
        name="정석안 상무"
        :count="12"
        :left-permissions="[
          'Project Revenue',
          'Project MM',
          'SSO',
          'Staff(Utility)',
          'Project List',
        ]"
        :right-permissions="[
          '직원 관리',
          '고객사 관리',
          '조직 관리',
          '사용자 관리',
          '권한 관리',
          '변경 히스토리',
          '접근 제어',
        ]"
      />
      <div class="permission-item" data-id="1" data-type="headquarters">
        <div class="permission-content permission-headquarters">
          <div class="permission-info">
            <span class="permission-name">UX/UI 그룹</span>
          </div>
        </div>
        <div class="permission-children">
          <PermissionCard
            id="20"
            position="그룹장"
            name="정은재 이사"
            :count="12"
            :left-permissions="[
              'Project Revenue',
              'Project MM',
              'SSO',
              'Staff(Utility)',
              'Project List',
            ]"
            :right-permissions="[
              '직원 관리',
              '고객사 관리',
              '조직 관리',
              '사용자 관리',
              '변경 히스토리',
              '접근 제어',
            ]"
            @edit="editOrganization('team', $event)"
          />
          <PermissionCard
            id="21"
            position="팀장"
            name="PM팀 박선희 부장"
            :count="12"
            :left-permissions="['Staff(Utility)', 'Project List']"
            :right-permissions="['직원 관리', '고객사 관리', '조직 관리']"
            @edit="editOrganization('team', $event)"
          />
          <PermissionCard
            id="1"
            position="팀장"
            name="UX/UI 1팀 이상헌 이사"
            :count="42"
            :left-permissions="[
              'Project Revenue',
              'Project MM',
              'Staff(Utility)',
              'Project List',
            ]"
            :right-permissions="['직원 관리', '고객사 관리', '조직 관리']"
            @edit="editOrganization('team', $event)"
          />
          <PermissionCard
            id="2"
            position="팀장"
            name="UX/UI 2팀 정지원 부장"
            :count="33"
            :left-permissions="['Staff(Utility)', 'Project List']"
            :right-permissions="['직원 관리', '고객사 관리', '조직 관리']"
            @edit="editOrganization('team', $event)"
          />
        </div>
      </div>
    </div>
  </ContentsArea>
</template>

<script setup lang="ts">
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import PermissionCard from '~/components/dms/PermissionCard.vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 권한 편집 함수
const editOrganization = (type: string, id: string | number) => {
  // 편집 기능 구현 필요
  // 여기에 편집 로직 추가
}
</script>

<style lang="scss" scoped>
// 조직도 트리 스타일
.permission-tree {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  width: 100%;
  padding: 0;

  .permission-item {
    width: 100%;
    overflow: hidden;
    border: 1px solid #cbcbcb;
    border-radius: 16px;
    &[data-type='headquarters'] {
      background: #fafafa;
    }
  }

  .permission-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .permission-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .permission-name {
    font-weight: 700;
    color: #000;
  }

  .permission-headquarters {
    padding: 24px;
    .permission-name {
      color: #000;
      font-size: 18px;
      line-height: 24px;
    }
  }

  .permission-children {
    display: flex;
    gap: 20px;
    padding: 20px 24px;
    background: #fff;
    border-top: 1px solid #cbcbcb;
    flex-wrap: wrap;
  }
}
</style>
