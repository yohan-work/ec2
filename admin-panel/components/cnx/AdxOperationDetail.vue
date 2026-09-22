<template>
  <article class="adx-ops-detail">
    <div class="adx-ops-detail-copy">
      <p class="adx-ops-detail-category">{{ item.popupCategory }}</p>
      <h3 class="adx-ops-detail-title">{{ item.title }}</h3>

      <div class="adx-ops-detail-block">
        <p class="adx-ops-detail-label">PROJECT</p>
        <p class="adx-ops-detail-heading">{{ item.projectTitle }}</p>
        <ul v-if="item.projectItems?.length" class="adx-ops-detail-list">
          <li v-for="(line, lineIndex) in item.projectItems" :key="lineIndex">{{ line }}</li>
        </ul>
        <p v-else-if="item.projectText" class="adx-ops-detail-text">{{ item.projectText }}</p>
      </div>

      <div v-if="item.performances?.length" class="adx-ops-detail-block">
        <p class="adx-ops-detail-label">PERFORMANCE</p>
        <ul class="adx-ops-metrics">
          <li v-for="(metric, metricIndex) in item.performances" :key="metricIndex">
            <strong>{{ metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </li>
        </ul>
      </div>

      <div v-if="item.note" class="adx-ops-detail-note">
        <p class="adx-ops-detail-heading">{{ item.note.title }}</p>
        <p class="adx-ops-detail-text">{{ item.note.text }}</p>
      </div>

      <dl v-if="item.client || item.brand || item.status" class="adx-ops-detail-meta">
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

    <div class="adx-ops-detail-media" :class="{ stacked: item.media?.length > 1 }">
      <figure v-for="(media, mediaIndex) in item.media" :key="mediaIndex">
        <img :src="media.src" :alt="media.alt">
        <figcaption v-if="media.caption">
          <span>{{ media.caption }}</span>
          <span v-if="media.meta" class="meta">{{ media.meta }}</span>
        </figcaption>
      </figure>
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.adx-ops-detail {
  display: flex;
  flex-direction: column;
  background: #0a1728;
  color: $d-white;
  border-radius: rem(20);
  overflow: hidden;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: rem(40);
    min-height: rem(520);
    border-radius: rem(28);
  }

  &-copy {
    display: flex;
    flex-direction: column;
    padding: rem(24) rem(20) rem(8);

    @media (min-width: 1024px) {
      padding: rem(40) 0 rem(40) rem(44);
    }
  }

  &-category {
    margin: 0;
    padding-right: rem(36);
    color: rgba(255, 255, 255, 0.55);
    font-size: rem(12);
    font-weight: $font-weight-bold;
    letter-spacing: 0.02em;

    @media (min-width: 1024px) {
      padding-right: 0;
      font-size: rem(13);
    }
  }

  &-title {
    margin: rem(8) 0 0;
    padding-right: rem(36);
    padding-bottom: rem(16);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    font-size: rem(20);
    font-weight: $font-weight-bold;
    line-height: $line-height-normal;
    word-break: keep-all;

    @media (min-width: 1024px) {
      margin-top: rem(10);
      padding-right: 0;
      padding-bottom: rem(20);
      font-size: rem(28);
    }
  }

  &-block {
    margin-top: rem(18);

    @media (min-width: 1024px) {
      margin-top: rem(22);
    }
  }

  &-label {
    margin: 0 0 rem(8);
    color: rgba(255, 255, 255, 0.45);
    font-size: rem(11);
    font-weight: $font-weight-bold;
    letter-spacing: 0.04em;

    @media (min-width: 1024px) {
      font-size: rem(12);
    }
  }

  &-heading {
    margin: 0;
    font-size: rem(14);
    font-weight: $font-weight-bold;
    line-height: $line-height-relaxed;
    word-break: keep-all;

    @media (min-width: 1024px) {
      font-size: rem(16);
    }
  }

  &-text,
  &-list {
    margin: rem(8) 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: rem(13);
    line-height: 1.7;
    word-break: keep-all;

    @media (min-width: 1024px) {
      margin-top: rem(10);
      font-size: rem(14);
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
  }

  &-meta {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    margin-top: rem(20);
    padding-top: rem(16);

    @media (min-width: 1024px) {
      margin-top: auto;
      padding-top: rem(28);
    }

    div {
      display: flex;
      gap: rem(16);
    }

    dt {
      width: rem(64);
      color: rgba(255, 255, 255, 0.45);
      font-size: rem(11);
      font-weight: $font-weight-bold;

      @media (min-width: 1024px) {
        width: rem(72);
        font-size: rem(12);
      }
    }

    dd {
      margin: 0;
      font-size: rem(13);
      font-weight: $font-weight-bold;

      @media (min-width: 1024px) {
        font-size: rem(14);
      }
    }
  }

  &-media {
    display: flex;
    flex-direction: column;
    gap: rem(12);
    padding: rem(16) rem(16) rem(20);

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      padding: rem(28) rem(28) rem(28) 0;

      &.stacked {
        flex-direction: column;
        justify-content: center;
        gap: rem(16);
      }
    }

    figure {
      width: 100%;
      margin: 0;
    }

    img {
      display: block;
      width: 100%;
      border-radius: rem(16);
      object-fit: cover;
      transform: scale(1.02);

      @media (min-width: 1024px) {
        border-radius: rem(20);
        transform: scale(1.04);
      }
    }

    figcaption {
      display: flex;
      justify-content: space-between;
      gap: rem(12);
      margin-top: rem(8);
      color: rgba(255, 255, 255, 0.7);
      font-size: rem(12);

      .meta {
        color: $s-teal;
        font-weight: $font-weight-bold;
      }
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

  @media (min-width: 1024px) {
    gap: rem(18) rem(16);
  }

  strong {
    display: block;
    color: $s-teal;
    font-size: rem(22);
    font-weight: $font-weight-bold;
    line-height: 1.2;

    @media (min-width: 1024px) {
      font-size: rem(28);
    }
  }

  span {
    display: block;
    margin-top: rem(4);
    color: rgba(255, 255, 255, 0.7);
    font-size: rem(12);
    line-height: $line-height-relaxed;
    word-break: keep-all;

    @media (min-width: 1024px) {
      font-size: rem(13);
    }
  }
}
</style>
