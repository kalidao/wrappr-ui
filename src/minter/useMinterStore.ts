import { create } from 'zustand'

export type Entity = 'LLC' | 'UNA'
export type Jurisdiction = 'de' | 'wy' | 'mi'

export enum ViewsEnum {
  entity = 'entity',
  juris = 'juris',
  deLLC = 'deLLC',
  miLLC = 'miLLC',
  wyUNA = 'wyUNA',
  mint = 'mint',
  success = 'success',
  error = 'error',
}

interface MinterStore {
  view: ViewsEnum
  setView: (view: ViewsEnum) => void
  entity: Entity | undefined
  setEntity: (entity: Entity) => void
  juris: Jurisdiction | undefined
  setJuris: (juris: Jurisdiction) => void
  name: string
  setName: (name: string) => void
  mission: string
  setMission: (mission: string) => void
  tokenId: number
  setTokenId: (tokenId: number) => void
  agreement: string
  setAgreement: (agreement: string) => void
  uri: string
  setUri: (uri: string) => void
  txHash: string
  setTxHash: (txHash: string) => void
  reset: () => void
  error: string
  setError: (error: string) => void
}

export const useMinterStore = create<MinterStore>((set) => ({
  view: ViewsEnum.entity,
  setView: (view) => set({ view }),
  entity: undefined,
  setEntity: (entity) => set({ entity }),
  juris: undefined,
  setJuris: (juris) => set({ juris }),
  name: '',
  setName: (name) => set({ name }),
  mission: '',
  setMission: (mission) => set({ mission }),
  tokenId: 0,
  setTokenId: (tokenId) => set({ tokenId }),
  agreement: '',
  setAgreement: (agreement) => set({ agreement }),
  uri: '',
  setUri: (uri) => set({ uri }),
  txHash: '',
  setTxHash: (txHash) => set({ txHash }),
  reset: () =>
    set({
      view: ViewsEnum.entity,
      entity: undefined,
      juris: undefined,
      name: '',
      mission: '',
      tokenId: 0,
      agreement: '',
      uri: '',
      txHash: '',
    }),
  error: '',
  setError: (error) => set({ error }),
}))
