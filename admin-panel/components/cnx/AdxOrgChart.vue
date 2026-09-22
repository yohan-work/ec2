<template>
  <section ref="sectionRef" class="adx-org" :aria-label="plainTitle || undefined">
    <h2 v-if="title" class="adx-org-title" v-html="title"></h2>

    <div class="adx-org-tree">
      <div class="adx-org-hub">
        <p class="adx-org-hub-title">{{ hub.title }}</p>
        <p class="adx-org-hub-subtitle">{{ hub.subtitle }}</p>
      </div>

      <ul class="adx-org-groups">
        <li
          v-for="group in groups"
          :key="group.id"
          class="adx-org-group"
          :class="{ 'is-on': activeGroupId === group.id }"
          @click="onGroupClick(group.id, $event)"
        >
          <h3 class="adx-org-group-title">{{ group.title }}</h3>
          <ul class="adx-org-group-list">
            <li
              v-for="(item, index) in group.items"
              :key="index"
              class="adx-org-group-item"
              :class="{ 'is-on': activeItemKey === `${group.id}-${index}` }"
              @click.stop="onItemClick(group.id, index)"
            >
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  title: { type: String, default: '' },
  hub: {
    type: Object,
    default: () => ({ title: '', subtitle: '' }),
  },
  groups: { type: Array, default: () => [] },
})

const plainTitle = computed(() =>
  props.title ? props.title.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''
)

const sectionRef = ref(null)
const activeGroupId = ref(null)
const activeItemKey = ref(null)
let lastScrollY = 0

const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

const onGroupClick = (id) => {
  if (isFinePointer()) return
  if (activeGroupId.value === id && !activeItemKey.value) {
    activeGroupId.value = null
    return
  }
  activeGroupId.value = id
  activeItemKey.value = null
}

const onItemClick = (groupId, index) => {
  if (isFinePointer()) return
  const key = `${groupId}-${index}`
  if (activeItemKey.value === key) {
    activeItemKey.value = null
    activeGroupId.value = null
    return
  }
  activeGroupId.value = groupId
  activeItemKey.value = key
}

const onDocumentClick = (event) => {
  if (isFinePointer()) return
  if (!sectionRef.value?.contains(event.target)) {
    activeGroupId.value = null
    activeItemKey.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    const currentScrollY = window.scrollY || window.pageYOffset
    const isScrollingDown = currentScrollY > lastScrollY
    lastScrollY = currentScrollY

    if (isIntersecting && isScrollingDown) {
      sectionRef.value?.classList.add('active')
    } else if (!isIntersecting && !isScrollingDown) {
      sectionRef.value?.classList.remove('active')
    }
  },
  {
    threshold: 0.2,
    rootMargin: '-50px',
  }
)
</script>

<style lang="scss" scoped>
$adx-navy: #0a1728;
$adx-mint: #35e0c4;
$adx-teal: #0b7a66;
$adx-cyan: #2fb6d9;
$adx-blue: #8fb0ff;
$adx-ink: #152a3d;
$adx-line: #e1e7ed;
$adx-sub: #178ac5;

.adx-org {
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
    margin: 0 0 rem(32);
    font-size: rem(22);
    font-weight: $font-weight-bold;
    line-height: $line-height-normal;
    text-align: left;
    color: $adx-navy;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    @include tablet {
      margin-bottom: rem(60);
      font-size: rem(32);
      text-align: center;
    }

    @include desktop {
      margin-bottom: rem(80);
      font-size: rem(42);
    }
  }

  &-tree {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out 0.15s;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: rem(-16);
      width: min(rem(880), 96%);
      height: 62%;
      pointer-events: none;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        rgba(53, 224, 196, 0.16),
        rgba(47, 182, 217, 0.07) 55%,
        transparent 72%
      );
      transform: translateX(-50%);
    }
  }

  &-hub {
    position: relative;
    z-index: 2;
    width: max-content;
    max-width: 100%;
    padding: rem(24) clamp(#{rem(30)}, 3.6vw, #{rem(50)}) rem(22);
    text-align: center;
    background:
      linear-gradient(90deg, $adx-cyan, $adx-mint, $adx-teal) top / 100% rem(3) no-repeat,
      linear-gradient(168deg, #ffffff 0%, #f2f7fb 100%);
    border: 1px solid $adx-line;
    border-radius: rem(16);
    box-shadow:
      0 rem(18) rem(40) -22px rgba(21, 42, 61, 0.45),
      0 0 0 rem(6) rgba(53, 224, 196, 0.06);

    &::after {
      content: '';
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      width: rem(2);
      height: rem(32);
      background: linear-gradient($adx-mint, rgba(53, 224, 196, 0.25));
      transform: translateX(-50%) scaleY(0);
      transform-origin: top;
      transition: transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);

      @include tablet {
        display: block;
      }
    }

    &-title {
      margin: 0;
      font-size: $font-size-body1-mobile;
      font-weight: $font-weight-bold;
      line-height: $line-height-tight;
      color: $adx-navy;

      @include tablet {
        font-size: $font-size-body1-tablet;
      }

      @media (min-width: 1024px) {
        font-size: rem(24);
      }
    }

    &-subtitle {
      margin: rem(8) 0 0;
      font-size: $font-size-body3-mobile;
      font-weight: $font-weight-bold;
      line-height: $line-height-normal;
      color: $adx-sub;

      @include tablet {
        font-size: $font-size-body3-tablet;
      }

      @media (min-width: 1024px) {
        font-size: rem(16);
      }
    }
  }

  &-groups {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: rem(26);
    width: 100%;
    margin: rem(26) 0 0;
    padding: 0;
    list-style: none;

    @include tablet {
      flex-direction: row;
      align-items: stretch;
      gap: clamp(#{rem(16)}, 2vw, #{rem(28)});
      margin-top: rem(32);
      padding-top: rem(32);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: calc(100% / 6);
        right: calc(100% / 6);
        height: rem(2);
        border-radius: rem(2);
        background: linear-gradient(
          90deg,
          rgba(47, 182, 217, 0.35),
          $adx-mint 50%,
          rgba(143, 176, 255, 0.35)
        );
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
      }
    }
  }

  &-group {
    --ac: #{$adx-mint};
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;

    &:nth-child(1) {
      --ac: #{$adx-cyan};
    }

    &:nth-child(2) {
      --ac: #{$adx-mint};
    }

    &:nth-child(3) {
      --ac: #{$adx-blue};
    }

    &::after {
      content: '';
      position: absolute;
      top: rem(-2);
      left: 50%;
      z-index: 2;
      width: rem(9);
      height: rem(9);
      background: var(--ac);
      border-radius: 50%;
      box-shadow: 0 0 0 rem(4) rgba(245, 248, 250, 0.9);
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.2s cubic-bezier(0.34, 1.4, 0.5, 1);
    }

    &::before {
      display: none;
    }

    @include tablet {
      &::after {
        top: 0;
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: rem(-32);
        left: 50%;
        z-index: 1;
        width: rem(2);
        height: rem(32);
        background: linear-gradient(rgba(255, 255, 255, 0), var(--ac));
        transform: translateX(-50%) scaleY(0);
        transform-origin: top;
        transition: transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
      }
    }

    &-title {
      position: relative;
      overflow: hidden;
      margin: 0;
      padding: clamp(#{rem(18)}, 2vw, #{rem(24)}) clamp(#{rem(14)}, 1.6vw, #{rem(20)});
      font-size: $font-size-body3-mobile;
      font-weight: $font-weight-bold;
      line-height: $line-height-normal;
      text-align: center;
      color: $d-white;
      background: linear-gradient(158deg, #173049 0%, #0a1728 62%);
      border-radius: rem(13);
      box-shadow: 0 rem(16) rem(34) -20px rgba(10, 23, 40, 0.7);
      transition: transform 0.12s ease, box-shadow 0.12s ease;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: rem(3);
        background: var(--ac);
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(
          220px 120px at 50% -20%,
          rgba(53, 224, 196, 0.22),
          transparent 70%
        );
        transition: opacity 0.12s ease;
      }

      @include tablet {
        font-size: rem(12);
      }

      @media (min-width: 1024px) {
        font-size: rem(16);
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: clamp(#{rem(9)}, 1vw, #{rem(12)});
      margin: clamp(#{rem(12)}, 1.4vw, #{rem(18)}) 0 0;
      padding: 0;
      list-style: none;
    }

    &-item {
      position: relative;
      overflow: hidden;
      padding: rem(14);
      font-size: $font-size-body3-mobile;
      font-weight: $font-weight-bold;
      line-height: $line-height-relaxed;
      text-align: center;
      color: $adx-ink;
      background: linear-gradient(160deg, #eff5fa 0%, #e6eef7 100%);
      border: 1px solid #dbe6f1;
      border-radius: rem(10);
      opacity: 0;
      transform: translateY(8px);
      transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        background 0.12s ease,
        border-color 0.12s ease,
        box-shadow 0.12s ease;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: rem(3);
        background: var(--ac);
        transform: scaleY(0);
        transform-origin: center;
        transition: transform 0.12s ease;
      }

      @include tablet {
        font-size: rem(12);
      }

      @media (min-width: 1024px) {
        font-size: rem(16);
      }
    }
  }

  .adx-org-group:hover .adx-org-group-title,
  .adx-org-group:active .adx-org-group-title,
  .adx-org-group.is-on .adx-org-group-title {
    transform: translateY(-4px);
    box-shadow: 0 rem(24) rem(44) -20px rgba(10, 23, 40, 0.8);

    &::after {
      opacity: 1;
    }
  }

  .adx-org-group-item:hover,
  .adx-org-group-item:active,
  .adx-org-group-item.is-on {
    background: #fff;
    border-color: rgba(18, 169, 143, 0.45);
    box-shadow: 0 rem(10) rem(22) -14px rgba(21, 42, 61, 0.4);

    &::before {
      transform: scaleY(1);
    }
  }

  &.active {
    .adx-org-title,
    .adx-org-tree {
      opacity: 1;
      transform: translateY(0);
    }

    .adx-org-hub::after {
      transform: translateX(-50%) scaleY(1);
    }

    .adx-org-groups::before {
      transform: scaleX(1);
    }

    .adx-org-group {
      &::before {
        transform: translateX(-50%) scaleY(1);
      }

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .adx-org-group-item {
      opacity: 1;
      transform: none;

      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          transition-delay: #{0.04s + ($i - 1) * 0.02s};
        }
      }
    }
  }
}
</style>
