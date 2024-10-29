import { LayoutContent } from '@/layouts/LayoutContent'


export const Explore = () => {
  const sections = [
    { title: 'Nuevos Lanzamientos', id: 'nuevos_lanzamientos' },
    { title: 'Populares', id: 'populares' },
    { title: 'Próximos Lanzamientos', id: 'proximos_lanzamientos' },
  ]

  return (
    <div>
      {sections.map(({ title, id }) => {
        return (
          <LayoutContent
            key={id}
            title={title}
            section={id}
            url={`https://health-production-6b96.up.railway.app/api/book?section=${id}`}
          />
        )
      })}
    </div>
  )
}
