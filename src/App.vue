<script setup lang="ts">
import type { IRoles } from '@/type'

import { onMounted } from 'vue'

import { fetchAllHeroes } from '@/api'
import nickname from '@/data/nickname.json'
import { useStateStore } from '@/stores/state'

import MainVeiw from './components/mainVeiw.vue'

onMounted(async () => {
    const stateStore = useStateStore()
    const heros = await fetchAllHeroes()
    heros.forEach((hero) => {
        stateStore.heroes[hero.name] = {
            id: hero.id,
            name: hero.name,
            avatarUrl: hero.avatarUrl,
            nickname: nickname[hero.name as keyof typeof nickname] || [],
            roles: hero.roles.split('/') as IRoles[]
        }
    })
})
</script>

<template>
    <MainVeiw></MainVeiw>
</template>

<style>
body {
    margin: 0;
}
</style>
