import { useAppStore } from './store.ts'
import { fetchDataRequest } from './api.ts'

export async function fetchData() {
  const res = await fetchDataRequest('id-1')

  useAppStore.setState({
    loading: false,
    ...res,
  })
}
