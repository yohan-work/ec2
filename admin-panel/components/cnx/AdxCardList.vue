<template>
  <div ref="listRef" class="adx-card" :aria-label="plainTitle || undefined">
    <h2 v-if="title" class="adx-card-title" v-html="title"></h2>
    <ul class="adx-card-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="adx-card-item"
      >
        <div class="adx-card-item-main">
          <h3 class="adx-card-item-title">{{ item.title }}</h3>
          <p v-if="item.description" class="adx-card-item-description" v-html="item.description"></p>
          <ul v-if="item.list && item.list.length" class="adx-card-item-list">
            <li v-for="(listItem, index) in item.list" :key="index">{{ listItem }}</li>
          </ul>
        </div>
        <p v-if="item.footer" class="adx-card-item-footer" v-html="item.footer"></p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
})

const plainTitle = computed(() =>
  props.title ? props.title.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''
)

const listRef = ref(null)
let lastScrollY = 0

useIntersectionObserver(
  listRef,
  ([{ isIntersecting }]) => {
    const currentScrollY = window.scrollY || window.pageYOffset
    const isScrollingDown = currentScrollY > lastScrollY
    lastScrollY = currentScrollY

    if (isIntersecting && isScrollingDown) {
      listRef.value?.classList.add('active')
    } else if (!isIntersecting && !isScrollingDown) {
      listRef.value?.classList.remove('active')
    }
  },
  {
    threshold: 0.2,
    rootMargin: '-50px',
  }
)
</script>

<style lang="scss" scoped>
.adx-card {
  * {
    word-break: keep-all;
  }

  margin-bottom: rem(48);

  @include tablet {
    margin-bottom: rem(120);
  }

  @include desktop {
    margin-bottom: rem(180);
  }

  &-title {
    margin: 0 auto rem(24);
    font-size: rem(22);
    font-weight: $font-weight-bold;
    line-height: $line-height-normal;
    text-align: left;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    @include tablet {
      font-size: rem(32);
    }

    @media (min-width: 1024px) {
      text-align: center;
    }

    @include desktop {
      font-size: rem(42);
      margin-bottom: rem(40);
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: rem(15);
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: card;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: stretch;
    }

    @include desktop {
      gap: rem(32);
    }
  }

  &-item {
    counter-increment: card;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: rem(16);
    width: 100%;
    min-height: rem(336);
    padding: rem(30) rem(30) rem(27);
    border-radius: rem(8);
    color: $d-white;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    &:nth-child(1) { background-color: #2195CD; }
    &:nth-child(2) { background-color: #1C4D78; }
    &:nth-child(3) { background-color: #14253C; }

    @include tablet {
      min-height: rem(234);
      padding: rem(30) rem(20) rem(20);
    }

    @media (min-width: 1024px) {
      flex: 1;
      min-height: rem(500);
    }

    @include desktop {
      gap: rem(24);
      min-height: rem(500);
      padding: rem(46) rem(42) rem(40);
      border-radius: rem(18);
    }

    &-main {
      flex-shrink: 0;

      &::before {
        content: counter(card, decimal-leading-zero);
        display: block;
        font-size: rem(12);
        font-weight: $font-weight-bold;
        color: $s-teal;
      }
    }

    &-title {
      margin: 0;
      color: $d-white;
      font-size: $font-size-body1-mobile;
      font-weight: $font-weight-bold;
      line-height: $line-height-relaxed;

      @include tablet {
        font-size: $font-size-body1-tablet;
      }

      @include desktop {
        font-size: rem(24);
      }
    }

    &-description {
      margin: rem(13) 0 rem(16);
      color: $s-teal;
      font-size: $font-size-body3-mobile;
      font-weight: $font-weight-bold;
      line-height: $line-height-loose;

      @include tablet {
        font-size: $font-size-body3-tablet;
        margin-top: rem(10);
      }

      @include desktop {
        font-size: rem(16);
        margin-top: rem(20);
      }
    }

    &-list {
      margin: 0;
      padding: 0 0 0 rem(12);
      list-style: none;

      li {
        position: relative;
        padding-left: rem(16);
        color: $d-white;
        font-size: $font-size-body3-mobile;
        font-weight: $font-weight-regular;
        line-height: 180%;

        @include tablet {
          font-size: $font-size-body3-tablet;
        }

        @include desktop {
          font-size: rem(16);
        }

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          font-weight: $font-weight-regular;
        }
      }
    }

    &-footer {
      flex-shrink: 0;
      margin: 0;
      color: $d-white;
      font-size: $font-size-body3-mobile;
      font-weight: $font-weight-regular;
      line-height: $line-height-loose;

      @include tablet {
        font-size: $font-size-body3-tablet;
      }

      @include desktop {
        font-size: rem(16);
      }
    }
  }

  &.active {
    .adx-card-title,
    .adx-card-item {
      opacity: 1;
      transform: translateY(0);
    }

    .adx-card-item {
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          transition-delay: #{($i - 1) * 0.1}s;
        }
      }
    }
  }
}
</style>
