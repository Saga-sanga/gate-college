import { HeaderClient } from '@/components/Header/index.client'
import React from 'react'

import type { Header } from 'src/payload-types'

export async function Header() {
  return <HeaderClient />
}
