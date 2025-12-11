<script setup lang="ts">
import type { IHero, IRoles } from '@/type'

import Dialog from 'primevue/dialog'
import { computed } from 'vue'

import { useStateStore } from '@/stores/state'

const props = defineProps<{
    visible: boolean
    role: IRoles
}>()

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'select', hero: IHero): void
}>()

const stateStore = useStateStore()

const filteredHeroes = computed(() => {
    return Object.values(stateStore.heroes).filter((hero) => hero.roles.includes(props.role))
})

function selectHero(hero: IHero) {
    emit('select', hero)
    emit('update:visible', false)
}
</script>

<template>
    <Dialog
        :visible="visible"
        :header="`选择${role}英雄`"
        modal
        dismissable-mask
        :style="{ width: '50dvw', height: '50dvh' }"
        @update:visible="emit('update:visible', $event)"
    >
        <div class="hero-grid">
            <div
                v-for="hero in filteredHeroes"
                :key="hero.id"
                class="hero-item"
                @click="selectHero(hero)"
            >
                <img :src="hero.avatarUrl" :alt="hero.name" />
                <span>{{ hero.name }}</span>
            </div>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.hero-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px;
    overflow-y: auto;
}

.hero-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 4px;
        object-fit: cover;
    }

    span {
        margin-top: 4px;
        font-size: 12px;
        text-align: center;
    }
}
</style>
