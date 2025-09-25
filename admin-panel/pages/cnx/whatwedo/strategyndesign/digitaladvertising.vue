<template>
  <div class="digital-advertising-page">
    <!-- 키 비주얼 섹션 -->
    <section class="key-visual-section">
      <AppKeyVisual 
        imageAlt="Digital Advertising Key Visual"
        :animationDuration="1200"
      />
    </section>

    <!-- 제목 섹션 -->
    <div class="inner">
      <section class="title-section">
        <AppTitle>
          Digital Advertising
          <template #description>
            데이터 기반의 디지털 광고 전략으로 브랜드의 성장을 이끌어갑니다.
          </template>
        </AppTitle>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppTitle from '~/components/cnx/AppTitle.vue'

// 레이아웃 설정
definePageMeta({
  layout: 'concentrix'
})


</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_base' as *;
</style>
