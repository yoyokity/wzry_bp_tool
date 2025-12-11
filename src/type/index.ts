export const roles = ['对抗路', '打野', '中路', '发育路', '游走'] as const
export type IRoles = (typeof roles)[number]

export interface IHeroRaw {
    id: number
    name: string
    avatarUrl: string
    roles: string
    serverCached: string
}

export interface IHero {
    id: number
    name: string
    avatarUrl: string
    nickname: string[]
    roles: IRoles[]
}

export interface ICounterHero {
    heroName: string
    totalMatches: number
    advantageIndex: number
}

export interface ISynergyHero {
    heroName: string
    synergyIndex: number
    totalMatches: number
}

export interface IHeroAnalysis {
    heroId: number
    counters: ICounterHero[]
    counteredBy: ICounterHero[]
    goodSynergies: ISynergyHero[]
    badSynergies: ISynergyHero[]
    serverCached: string
}
