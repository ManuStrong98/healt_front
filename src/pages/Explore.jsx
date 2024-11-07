import { useGetBooksSection } from '@/hooks/useBooks'
import { LayoutContent } from '@/layouts/LayoutContent'


export const Explore = () => {
  const sections = [
    {
      title: 'Nuevos Lanzamientos',
      id: 'nuevos_lanzamientos',
      content: useGetBooksSection('nuevos')
    },
    {
      title: 'Populares',
      id: 'populares',
      content: useGetBooksSection('populares')
    },
    {
      title: 'Próximos Lanzamientos',
      id: 'proximos_lanzamientos',
      content: useGetBooksSection('proximos')
    },
  ]

  return (
    <>
      {sections.map(({ title, id, content }) => (
        <LayoutContent
          key={id}
          title={title}
          content={content}
          disabled={id === 'proximos_lanzamientos'}
        />
      ))}
    </>
  )
}
