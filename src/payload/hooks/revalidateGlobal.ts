import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'
import type { Config } from 'src/payload-types'

type Global = keyof Config['globals']

export function revalidateGlobal(name: Global) {
  const revalidateFunction: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating ${name}`)

    revalidateTag(`global_${name}`)

    return doc
  }
  return revalidateFunction
}
