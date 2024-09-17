import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateStudentsLife: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating students life')

  revalidateTag('global_students-life')

  return doc
}
