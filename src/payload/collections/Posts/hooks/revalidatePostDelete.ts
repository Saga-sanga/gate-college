import type { CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../../payload-types'

export const revalidatePostDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    payload.logger.info(`Revalidating post at path: home`)

    revalidatePath('/')
  }

  return doc
}
