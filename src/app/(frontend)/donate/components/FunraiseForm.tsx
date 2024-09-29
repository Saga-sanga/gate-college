'use client'

import { useEffect } from 'react'

export function FunraiseForm() {
  useEffect(() => {
    // @ts-ignore using 3rd pary script to inject dependency
    if (window.funraise)
      // @ts-ignore using 3rd pary script to inject dependency
      window.funraise.push('create', { form: 271 })
  }, [])

  return <div id="fr-placed-form-container-271" style={{ minHeight: '816px' }}></div>
}
