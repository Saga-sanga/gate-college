'use client'
import { HighlightSection } from 'src/payload-types'

export type YoutubeEmbedProps = {
  youtubeLink: HighlightSection['youtube-link']
  title: HighlightSection['title']
}

function convertEmbedURL(url: string): string {
  const videoCode = url.split('=')[1]
  return `https://www.youtube.com/embed/${videoCode}`
}

export default function YoutubeEmbed({ youtubeLink, title }: YoutubeEmbedProps) {
  return (
    <iframe
      className="w-full"
      width="560"
      height="315"
      src={convertEmbedURL(youtubeLink)}
      title={title}
      allowFullScreen
    ></iframe>
  )
}
