<template>
  <TitleArea title="권한 관리"> </TitleArea>
  <ContentsArea>
    <div class="org-tree" id="orgTree">
      <div class="org-item" data-id="1" data-type="headquarters">
        <div class="org-content org-headquarters">
          <div class="org-info">
            <span class="org-icon"><div v-html="officeSvg"></div></span>
            <span class="org-name">CiX 본부</span>
          </div>
          <div class="org-children">
            <PermissionCard
              id="20"
              name="본부장 정석안 상무"
              :count="12"
              variant="white"
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
              @edit="editOrganization('team', $event)"
            />
          </div>
        </div>
        <div class="org-children">
          <div class="org-item" data-id="1" data-type="group">
            <div class="org-content org-group">
              <div class="org-info">
                <span class="org-name">UX/UI 그룹</span>
              </div>
            </div>
            <div class="org-children">
              <PermissionCard
                id="20"
                name="그룹장 정은재 이사"
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
                name="PM팀 박선희 부장"
                :count="12"
                :left-permissions="['Staff(Utility)', 'Project List']"
                :right-permissions="['직원 관리', '고객사 관리', '조직 관리']"
                @edit="editOrganization('team', $event)"
              />
              <PermissionCard
                id="1"
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
                name="UX/UI 2팀 정지원 부장"
                :count="33"
                :left-permissions="['Staff(Utility)', 'Project List']"
                :right-permissions="['직원 관리', '고객사 관리', '조직 관리']"
                @edit="editOrganization('team', $event)"
              />
            </div>
          </div>
          <div class="org-item" data-id="5" data-type="group">
            <div class="org-content org-group">
              <div class="org-info">
                <span class="org-name">콘텐츠 그룹</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentsArea>
</template>

<script setup lang="ts">
import officeSvg from '~/components/assets/dms/icons/office.svg?raw'
import modifySvg from '~/components/assets/dms/icons/modify.svg?raw'
import deleteSvg from '~/components/assets/dms/icons/delete.svg?raw'
import addSvg from '~/components/assets/dms/icons/add.svg?raw'
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Button from '~/components/ui/Button.vue'
import PermissionCard from '~/components/dms/permissionCard.vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})

// 권한 편집 함수
const editOrganization = (type: string, id: string | number) => {
  console.log(`편집: ${type} - ${id}`)
  // 여기에 편집 로직 추가
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

    + .org-children {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 0 24px 24px 24px;
    }
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
