<!-- 버튼 탭 컴포넌트 : (1) 버튼 갯수, (2) 좌측 혹은 우측 정렬 옵션, (3) 버튼 텍스트 -->

<template>
    <div class="app-button-tab-container">
        <div class="tab-list" role="tablist" :class="[`align-${alignment}`]">
            <div v-for="(group, groupIndex) in tabGroups" :key="groupIndex" class="inner">
                <button v-for="(tab) in group" :key="tab.originalIndex"
                    :class="['tab-button', { 'is-active': activeTab === tab.originalIndex }]"
                    :aria-selected="activeTab === tab.originalIndex" :aria-controls="`tab-panel-${tab.originalIndex}`"
                    :id="`tab-${tab.originalIndex}`" role="tab" @click="selectTab(tab.originalIndex)">
                    {{ tab.text }}
                </button>
            </div>
        </div>
        <div class="tab-content">
            <div class="inner">
                <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" :id="`tab-panel-${index}`"
                    :aria-labelledby="`tab-${index}`" role="tabpanel" class="tab-panel">
                    <slot :name="tab.slot || `tab-${index}`" :tab="tab" :index="index">
                        {{ tab.content }}
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Tab {
    text: string;
    content?: string;
    slot?: string;
}

interface Props {
    tabs: Tab[];
    alignment?: 'left' | 'center' | 'right';
    modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
    alignment: 'left',
    modelValue: 0
});

const emit = defineEmits<{
    'update:modelValue': [value: number];
    'tab-change': [index: number, tab: Tab];
}>();

const activeTab = computed({
    get: () => props.modelValue,
    set: (value: number) => emit('update:modelValue', value)
});

// 탭을 3개씩 그룹으로 나누기
const tabGroups = computed(() => {
    const groups = [];
    for (let i = 0; i < props.tabs.length; i += 3) {
        const group = props.tabs.slice(i, i + 3).map((tab, index) => ({
            ...tab,
            originalIndex: i + index
        }));
        groups.push(group);
    }
    return groups;
});

const selectTab = (index: number) => {
    activeTab.value = index;
    emit('tab-change', index, props.tabs[index]);
};
</script>
<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_base' as *;
@use '~/layouts/scss/cnx/_functions' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;

.app-button-tab-container {
    width: 100%;
    height: auto;
    margin: rem(108) 0 0;

    @include tablet {
        margin: rem(49) 0 0;
    }

    @include desktop {
        margin: rem(63) 0 0;
    }
}

.tab-list {
    margin: 0 0 rem(36);

    @include tablet {
        margin: 0 0 rem(24);
    }

    @include desktop {
        margin: 0 0 rem(48);
    }

    .inner {
        display: flex;
        align-items: stretch;
        justify-content: center;
        gap: rem(4);
        padding: 0 rem(24);
        margin: 0 auto;

        @include tablet {
            padding: 0 rem(80);
        }

        @include desktop {
            gap: rem(12);
        }
    }

    .inner+.inner {
        margin: rem(8) auto 0;

        @include tablet {
            margin: rem(4) auto 0;
        }

        @include desktop {
            margin: rem(12) auto 0;
        }
    }

    &.align-left .inner {
        justify-content: flex-start;
    }

    &.align-center .inner {
        justify-content: center;
    }

    &.align-right .inner {
        justify-content: flex-end;
    }
}

.tab-button {
    padding: rem(12) rem(16);
    border: 1px solid $gray-4;
    border-radius: 24px;
    background: transparent;
    color: $gray-4;
    font-size: rem(10);
    font-weight: 500;
    cursor: pointer;

    @include tablet {
        font-size: rem(11);
    }

    @include desktop {
        font-size: rem(16);
    }

    &.is-active {
        background-color: $p-dark-blue;
        color: $d-white;
    }
}

.tab-content {
    .inner {
        padding: 0 rem(24);
        margin: 0 auto;

        @include tablet {
            padding: 0 rem(80);
        }
    }
}

.tab-panel {
    width: 100%;
    height: 100%;
}
</style>
