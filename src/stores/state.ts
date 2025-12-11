import type { IHero } from '@/type'

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStateStore = defineStore('state', () => {
    const heroes = reactive<Record<string, IHero>>({})

    return { heroes }
})
