import { LayoutContent } from '@/layouts/LayoutContent'
import { useGetAllProgress } from '../hooks/useProgress'


export const History = () => {
  const data = useGetAllProgress()
  return <LayoutContent title='Historial' content={data} />
}
