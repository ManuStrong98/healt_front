import { useState, useRef } from 'react'
import { ReactReader } from 'react-reader'


export const EpubViewer = ({ url }) => {
  const [location, setLocation] = useState(null)
  const renditionRef = useRef(null)

  return (
    <ReactReader
      url={url}
      location={location}
      locationChanged={(newLocation) => { setLocation(newLocation) }}
      getRendition={(rendition) => {
        renditionRef.current = rendition
        renditionRef.current.themes.register('customFont', {
          body: {
            'font-size': '1.1rem',
            'font-family': 'Arial, san-serif',
            'line-height': '1.5rem'
          }
        })
        rendition.themes.select('customFont')
      }}
    />
  )
}
