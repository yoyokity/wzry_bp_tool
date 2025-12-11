import type { IHeroAnalysis, IHeroRaw } from '@/type'

const AllHeroes_URL = '/api/allheroes'
const HeroAnalysis_URL = '/api/hero/analysis'

/** 获取所有英雄列表 */
export async function fetchAllHeroes(): Promise<IHeroRaw[]> {
    const response = await fetch(AllHeroes_URL)
    if (!response.ok) {
        throw new Error(`Failed to fetch heroes: ${response.status}`)
    }
    return response.json()
}

/** 获取英雄克制/配合分析数据 */
export async function fetchHeroAnalysis(heroId: number): Promise<IHeroAnalysis> {
    const response = await fetch(`${HeroAnalysis_URL}?heroId=${heroId}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch hero analysis: ${response.status}`)
    }
    return response.json()
}
