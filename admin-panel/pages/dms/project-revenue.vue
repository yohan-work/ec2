<template>
  <TitleArea title="Project Revenue" />
  <ContentsArea>
    <div class="main-container">
      <Table>
        <thead>
          <tr>
            <th rowspan="2">Group</th>
            <th rowspan="2">Owner본부</th>
            <th rowspan="2">Account</th>
            <th rowspan="2">Project Name</th>
            <th rowspan="2">영문 계약명</th>
            <th rowspan="2">MSA</th>
            <th rowspan="2">Type</th>
            <th colspan="2">Project 기간</th>
            <th colspan="2">계약금액</th>
            <th rowspan="2">단위</th>
            <th rowspan="2">계약 여부</th>
            <th colspan="6">CPT MM</th>
          </tr>
          <tr>
            <th>from</th>
            <th>to</th>
            <th>Total ECR</th>
            <th>CiX Rev</th>
            <th>CL6</th>
            <th>CL7</th>
            <th>CL8B</th>
            <th>CL8A</th>
            <th>CL9B</th>
            <th>CL9A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alpha</td>
            <td>본부1</td>
            <td>AccountA</td>
            <td>Project Apollo</td>
            <td>Apollo Contract</td>
            <td>Y</td>
            <td>Type1</td>
            <td>2024-01-01</td>
            <td>2024-12-31</td>
            <td>1,000,000</td>
            <td>800,000</td>
            <td>USD</td>
            <td>Yes</td>
            <td>10</td>
            <td>12</td>
            <td>8</td>
            <td>7</td>
            <td>5</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Beta</td>
            <td>본부2</td>
            <td>AccountB</td>
            <td>Project Zeus</td>
            <td>Zeus Contract</td>
            <td>N</td>
            <td>Type2</td>
            <td>2023-06-01</td>
            <td>2024-05-31</td>
            <td>2,000,000</td>
            <td>1,500,000</td>
            <td>KRW</td>
            <td>No</td>
            <td>15</td>
            <td>14</td>
            <td>10</td>
            <td>9</td>
            <td>6</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Beta</td>
            <td>본부2</td>
            <td>AccountB</td>
            <td>Project Zeus</td>
            <td>Zeus Contract</td>
            <td>N</td>
            <td>Type2</td>
            <td>2023-06-01</td>
            <td>2024-05-31</td>
            <td>2,000,000</td>
            <td>1,500,000</td>
            <td>KRW</td>
            <td>No</td>
            <td>15</td>
            <td>14</td>
            <td>10</td>
            <td>9</td>
            <td>6</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Beta</td>
            <td>본부2</td>
            <td>AccountB</td>
            <td>Project Zeus</td>
            <td>Zeus Contract</td>
            <td>N</td>
            <td>Type2</td>
            <td>2023-06-01</td>
            <td>2024-05-31</td>
            <td>2,000,000</td>
            <td>1,500,000</td>
            <td>KRW</td>
            <td>No</td>
            <td>15</td>
            <td>14</td>
            <td>10</td>
            <td>9</td>
            <td>6</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Beta</td>
            <td>본부2</td>
            <td>AccountB</td>
            <td>Project Zeus</td>
            <td>Zeus Contract</td>
            <td>N</td>
            <td>Type2</td>
            <td>2023-06-01</td>
            <td>2024-05-31</td>
            <td>2,000,000</td>
            <td>1,500,000</td>
            <td>KRW</td>
            <td>No</td>
            <td>15</td>
            <td>14</td>
            <td>10</td>
            <td>9</td>
            <td>6</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Beta</td>
            <td>본부2</td>
            <td>AccountB</td>
            <td>Project Zeus</td>
            <td>Zeus Contract</td>
            <td>N</td>
            <td>Type2</td>
            <td>2023-06-01</td>
            <td>2024-05-31</td>
            <td>2,000,000</td>
            <td>1,500,000</td>
            <td>KRW</td>
            <td>No</td>
            <td>15</td>
            <td>14</td>
            <td>10</td>
            <td>9</td>
            <td>6</td>
            <td>4</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </ContentsArea>
</template>

<script setup>
import TitleArea from '~/components/dms/TitleArea.vue'
import ContentsArea from '~/components/dms/ContentsArea.vue'
import Table from '~/components/ui/Table.vue'

definePageMeta({
  layout: 'dms',
  ssr: false,
})
</script>

<style lang="scss" scoped>
/* 스타일이 필요한 경우 여기에 추가 */
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 24px 32px 0;
  thead tr {
    &:first-child th {
      &:nth-child(4),
      &:nth-child(5) {
        text-align: left;
        min-width: 200px;
      }
    }
  }
  tbody td {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9),
    &:nth-child(12),
    &:nth-child(13),
    &:nth-child(14),
    &:nth-child(15),
    &:nth-child(16),
    &:nth-child(17),
    &:nth-child(18),
    &:nth-child(19) {
      text-align: center;
      white-space: nowrap;
    }
    &:nth-child(10),
    &:nth-child(11) {
      text-align: right;
      white-space: nowrap;
    }
    &:nth-child(4),
    &:nth-child(5) {
      text-align: left;
    }
  }
}
</style>
