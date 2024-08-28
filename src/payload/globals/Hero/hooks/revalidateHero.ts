import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateHero: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating hero')

  revalidateTag('global_hero-main')

  return doc
}
