import { Category, MasterProduct, useAppStore } from '../../../logic'

export interface MasterProductModalProps {
  id?: number
  name?: string
  category?: Category

  onDone?: (result: MasterProduct) => unknown
  onCancel?: () => unknown
}

export const showMasterProductModal = (
  props: Omit<MasterProductModalProps, 'onDone' | 'onCancel'> = {},
): Promise<MasterProduct | null> =>
  new Promise(resolve => {
    useAppStore.setState({
      masterProductModalProps: {
        ...props,
        onDone: resolve,
        onCancel: () => resolve(null),
      },
    })
  })
