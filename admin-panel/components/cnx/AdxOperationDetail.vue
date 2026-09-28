<template>
  <article class="adx-ops-detail">
    <div class="adx-ops-detail-copy">
      <p class="adx-ops-detail-category" v-html="popupCategory"></p>
      <h3 class="adx-ops-detail-title">{{ item.title }}</h3>

      <div class="adx-ops-detail-block">
        <p class="adx-ops-detail-label">PROJECT</p>
        <p class="adx-ops-detail-heading">{{ item.projectTitle }}</p>
        <p v-if="item.projectItems?.length === 1" class="adx-ops-detail-text">
          {{ item.projectItems[0] }}
        </p>
        <ul v-else-if="item.projectItems?.length" class="adx-ops-detail-list">
          <li v-for="(line, lineIndex) in item.projectItems" :key="lineIndex">
            {{ line }}
          </li>
        </ul>
        <p v-else-if="item.projectText" class="adx-ops-detail-text">
          {{ item.projectText }}
        </p>
      </div>

      <div v-if="item.performances?.length" class="adx-ops-detail-block">
        <p class="adx-ops-detail-label">PERFORMANCE</p>
        <ul class="adx-ops-metrics">
          <li
            v-for="(metric, metricIndex) in item.performances"
            :key="metricIndex"
          >
            <strong>{{ metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </li>
        </ul>
      </div>

      <div v-if="item.note" class="adx-ops-detail-note">
        <p class="adx-ops-detail-heading">{{ item.note.title }}</p>
        <p class="adx-ops-detail-text">{{ item.note.text }}</p>
      </div>

      <dl
        v-if="item.client || item.brand || item.status"
        class="adx-ops-detail-meta"
      >
        <div v-if="item.client">
          <dt>CLIENT</dt>
          <dd>{{ item.client }}</dd>
        </div>
        <div v-if="item.brand">
          <dt>BRAND</dt>
          <dd>{{ item.brand }}</dd>
        </div>
        <div v-if="item.status">
          <dt>STATUS</dt>
          <dd>{{ item.status }}</dd>
        </div>
      </dl>
    </div>

    <div
      class="adx-ops-detail-media"
      :class="{ stacked: item.media?.length > 1 }"
    >
      <figure v-for="(media, mediaIndex) in item.media" :key="mediaIndex">
        <picture>
          <source
            v-if="media.srcMobile"
            :srcset="media.srcMobile"
            media="(max-width: 1023px)"
          />
          <img :src="media.src" :alt="media.alt" />
        </picture>
        <figcaption v-if="media.caption">
          <span>{{ media.caption }}</span>
          <span v-if="media.meta" class="meta">{{ media.meta }}</span>
        </figcaption>
      </figure>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const popupCategory = computed(() =>
  props.item.category
    .replace(/<br\s*\/?>/gi, '')
    .replace(/<span>\s*/, '<span> ')
)
</script>

<style lang="scss" scoped>
$adx-wide: 1024px;
$adx-popup-height: rem(820);
$adx-panel: #0b1220;
$adx-line: rgba(255, 255, 255, 0.3);
$adx-muted: rgba(255, 255, 255, 0.5);

@mixin adx-wide {
  @media (min-width: $adx-wide) {
    @content;
  }
}

.adx-ops-detail {
  display: flex;
  flex-direction: column;
  background: $adx-panel;
  color: $d-white;
  border-radius: rem(20);
  word-break: keep-all;

  @include adx-wide {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(420px, 1.05fr);
    align-items: stretch;
    gap: rem(48);
    height: 100%;
    min-height: $adx-popup-height;
    padding: rem(50);
    border-radius: rem(40);
  }

  &-copy {
    display: flex;
    flex-direction: column;
    padding: rem(24) rem(20) rem(8);

    @include adx-wide {
      padding: 0;
    }
  }

  &-category {
    display: flex;
    gap: rem(20);
    margin: 0;
    color: $d-white;
    font-size: rem(12);
    font-weight: $font-weight-regular;
    letter-spacing: 0.02em;

    :deep(strong) {
      font-weight: $font-weight-bold;
      color: $s-teal;
    }

    @include adx-wide {
      padding-right: rem(40);
      font-size: rem(14);
    }
  }

  &-title {
    margin: rem(8) 0 0;
    padding-bottom: rem(16);
    border-bottom: 1px solid $adx-line;
    color: $d-white;
    font-size: rem(24);
    font-weight: $font-weight-bold;
    line-height: $line-height-normal;

    @include adx-wide {
      margin-top: rem(20);
      padding-bottom: rem(20);
      font-size: rem(32);
    }

    @include desktop {
      font-size: rem(42);
    }
  }

  &-block {
    margin-top: rem(18);
    padding-bottom: rem(18);
    border-bottom: 1px solid $adx-line;

    @include adx-wide {
      margin-top: rem(20);
      padding-bottom: rem(20);
    }
  }

  &-label {
    margin: 0 0 rem(8);
    color: $s-teal;
    font-size: rem(12);
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    @include adx-wide {
      margin-bottom: rem(20);
      font-size: rem(14);
    }
  }

  &-heading {
    margin: 0;
    font-size: rem(14);
    font-weight: $font-weight-bold;
    line-height: $line-height-relaxed;

    @include adx-wide {
      font-size: rem(20);
    }
  }

  &-text,
  &-list {
    margin: rem(8) 0 0;
    color: $adx-muted;
    font-size: rem(14);
    line-height: 1.6;

    @include adx-wide {
      margin-top: rem(20);
      font-size: rem(16);
    }
  }

  &-list {
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: rem(14);

      &::before {
        content: '•';
        position: absolute;
        left: 0;
      }
    }
  }

  &-note {
    margin-top: rem(18);

    .adx-ops-detail-heading {
      color: $s-teal;
    }

    @include adx-wide {
      margin-top: 0;
      padding-top: rem(24);
    }
  }

  &-meta {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    padding-top: rem(16);

    @include adx-wide {
      flex-direction: row;
      flex-wrap: wrap;
      gap: rem(24) rem(32);
      margin-top: auto;
      padding-top: rem(32);
    }

    div {
      display: flex;
      gap: rem(20);
    }

    dt {
      color: $adx-muted;
      font-size: rem(14);
      font-weight: $font-weight-bold;

      @include adx-wide {
        font-size: rem(16);
      }
    }

    dd {
      margin: 0;
      font-size: rem(14);
      font-weight: $font-weight-bold;

      @include adx-wide {
        font-size: rem(16);
      }
    }
  }

  &-media {
    display: flex;
    flex-direction: column;
    gap: rem(12);
    padding: rem(16) rem(16) rem(20);

    @include adx-wide {
      flex-direction: row;
      align-items: center;
      padding: rem(8) 0 0;

      &.stacked {
        flex-direction: column;
        justify-content: center;
        gap: rem(16);
      }
    }

    figure {
      position: relative;
      width: 100%;
      margin: 0;
    }

    img {
      display: block;
      width: 100%;
      border-radius: rem(16);
      object-fit: cover;
      transform: scale(1.02);

      @include adx-wide {
        border-radius: rem(32);
        transform: none;
      }
    }

    figcaption {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      gap: rem(12);
      width: 100%;
      margin-top: rem(8);
      padding: rem(10);
      color: $d-white;
      font-size: rem(12);

      .meta {
        color: $s-teal;
        font-weight: $font-weight-bold;
      }

      @include desktop {
        padding: rem(24) rem(26);
      }
    }
  }

  .adx-ops-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: rem(14) rem(12);
    margin: 0;
    padding: 0;
    list-style: none;

    > li:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }

    @include adx-wide {
      gap: rem(18) rem(16);
    }

    strong {
      display: block;
      color: $s-teal;
      font-size: rem(24);
      font-weight: $font-weight-bold;
      line-height: 1.2;

      @include adx-wide {
        font-size: rem(32);
      }
    }

    span {
      display: block;
      margin-top: rem(4);
      color: $adx-muted;
      font-size: rem(12);
      line-height: $line-height-relaxed;

      @include adx-wide {
        font-size: rem(14);
      }
    }
  }
}
</style>
