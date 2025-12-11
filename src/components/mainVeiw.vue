<script setup lang="ts">
import type { IHero, IRoles } from '@/type'

import { IconPlus } from '@tabler/icons-vue'
import Button from 'primevue/button'
import ContextMenu from 'primevue/contextmenu'
import { computed, ref } from 'vue'

import { fetchHeroAnalysis } from '@/api'
import { useStateStore } from '@/stores/state'
import { roles } from '@/type'

import SelectHeroDialog from './selectHeroDialog.vue'

const selectedHeroes = ref<Record<IRoles, IHero | null>>(
    Object.fromEntries(roles.map((r) => [r, null])) as Record<IRoles, IHero | null>
)
const dialogVisible = ref(false)
const currentRole = ref<IRoles>('对抗路')
const counterStats = ref<Record<string, number>>({})
const contextMenu = ref()
const contextMenuRole = ref<IRoles | null>(null)

function openDialog(role: IRoles) {
    currentRole.value = role
    dialogVisible.value = true
}

function onSelectHero(hero: IHero) {
    selectedHeroes.value[currentRole.value] = hero
}

function onContextMenu(event: MouseEvent, role: IRoles) {
    if (selectedHeroes.value[role]) {
        contextMenuRole.value = role
        contextMenu.value.show(event)
    }
}

function deleteHero() {
    if (contextMenuRole.value) {
        selectedHeroes.value[contextMenuRole.value] = null
        contextMenuRole.value = null
    }
}

const menuItems = ref([
    {
        label: '删除英雄',
        icon: 'pi pi-trash',
        command: deleteHero
    }
])

const stateStore = useStateStore()

function getHeroByName(name: string): IHero | undefined {
    return Object.values(stateStore.heroes).find((hero) => hero.name === name)
}

async function recommend() {
    const stats: Record<string, number> = {}

    for (const role of roles) {
        const hero = selectedHeroes.value[role]
        if (hero) {
            const analysis = await fetchHeroAnalysis(hero.id)

            // 统计 counteredBy 中每个英雄的值
            for (const counter of analysis.counteredBy) {
                stats[counter.heroName] = (stats[counter.heroName] ?? 0) + counter.advantageIndex
            }
        }
    }

    counterStats.value = stats
}

const sortedCounterStats = computed(() => {
    return Object.entries(counterStats.value)
        .map(([heroName, value]) => ({ heroName, value }))
        .sort((a, b) => a.value - b.value)
})
</script>

<template>
    <div class="main">
        <!-- 克制统计列表 -->
        <div v-if="sortedCounterStats.length > 0" class="counter-stats">
            <h2>克制统计</h2>
            <div class="stats-list">
                <div v-for="stat in sortedCounterStats" :key="stat.heroName" class="stat-item">
                    <div class="hero-info">
                        <img
                            v-if="getHeroByName(stat.heroName)"
                            :src="getHeroByName(stat.heroName)!.avatarUrl"
                            :alt="stat.heroName"
                            class="hero-avatar"
                        />
                        <span class="hero-name">{{ stat.heroName }}</span>
                    </div>
                    <span class="hero-value">{{ stat.value.toFixed(2) }}</span>
                </div>
            </div>
        </div>
        <div v-else class="counter-stats"></div>

        <!-- 英雄选择器 -->
        <div class="selector">
            <h2 style="margin-bottom: 0">选择敌方英雄</h2>
            <div class="role-list">
                <div v-for="role in roles" :key="role" class="role-item">
                    <p>{{ role }}</p>
                    <div
                        class="hero-box"
                        :class="{ selected: selectedHeroes[role] }"
                        @click="openDialog(role)"
                        @contextmenu="onContextMenu($event, role)"
                    >
                        <img
                            v-if="selectedHeroes[role]"
                            :src="selectedHeroes[role]!.avatarUrl"
                            :alt="`${role}英雄`"
                        />
                        <IconPlus v-else class="icon" />
                    </div>
                </div>
            </div>

            <!-- 推荐按钮 -->
            <Button label="推荐" size="large" @click="recommend" />
        </div>
    </div>

    <ContextMenu ref="contextMenu" :model="menuItems" />
    <SelectHeroDialog v-model:visible="dialogVisible" :role="currentRole" @select="onSelectHero" />
</template>

<style lang="scss" scoped>
.main {
    display: flex;
    gap: 32px;
    height: 100dvh;
    width: 100dvw;
}

.selector {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.role-list {
    display: flex;
    gap: 16px;
}

.role-item {
    text-align: center;

    p {
        margin: 0 0 8px;
    }
}

.hero-box {
    width: 60px;
    height: 60px;
    border: 2px dashed #888;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border 0.2s;

    &.selected {
        border-style: solid;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2px;
    }

    .icon {
        color: #888;
        width: 24px;
        height: 24px;
    }
}

.counter-stats {
    display: flex;
    flex: 1;
    flex-direction: column;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.stats-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    overflow-y: auto;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .hero-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .hero-avatar {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        object-fit: cover;
    }

    .hero-name {
        font-weight: 500;
    }

    .hero-value {
        color: #4caf50;
        font-weight: 600;
    }
}
</style>
