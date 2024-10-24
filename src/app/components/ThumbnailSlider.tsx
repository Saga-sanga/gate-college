'use client'
import type { EmblaOptionsType } from 'embla-carousel'
import Carousel, { Slider, SliderContainer, ThumsSlider } from './Carousel'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import type { StudentLife } from 'src/payload-types'
import { useEffect } from 'react'

export const dynamic = 'true'

type Props = {
  highlightReel: StudentLife['highlight-reel']
  className?: string
}

export function ThumbnailSlider({ highlightReel, className }: Props) {
  const OPTIONS: EmblaOptionsType = { loop: true }

  useEffect(() => {
    console.log('Component mounted')
    return () => {
      console.log('Component unmounted')
    }
  }, [])

  if (!highlightReel) {
    return null
  }

  return (
    <>
      <div
        className={cn(
          'py-5 2xl:w-[70%] dark:bg-base-dark bg-white sm:w-[80%] w-[90%] mx-auto',
          className,
        )}
      >
        <Carousel options={OPTIONS} className="pt-10 relative" isAutoPlay={true}>
          <SliderContainer className="gap-2">
            {highlightReel['highlight-images'].length > 0 &&
              highlightReel['highlight-images'].map((image) => {
                if (typeof image.picture === 'object') {
                  return (
                    <Slider
                      key={image.id}
                      className="xl:h-[500px] sm:h-[350px] h-[300px] w-full"
                      thumnailSrc={image.picture.url}
                    >
                      <Image
                        src={image.picture.url}
                        width={1400}
                        height={900}
                        alt={image.picture.alt}
                        className="h-full object-cover rounded-lg w-full"
                      />
                    </Slider>
                  )
                }
              })}
          </SliderContainer>
          <ThumsSlider />
        </Carousel>
      </div>
    </>
  )
}
