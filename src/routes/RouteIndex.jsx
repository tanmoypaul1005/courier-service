import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { adminRouteMapper } from './adminRouteMapper'
import { commonRouteMapper } from './commonRouteMapper'
import { companyRouteMapper } from './companyRouteMapper'
import { customerRouteMapper } from './customerRouteMapper'
import { testRouteMapper } from './testRouteMapper'

export default function RouteIndex() {

  const mainRouteMapper = useRoutes([
    ...testRouteMapper,

    ...commonRouteMapper,

    ...adminRouteMapper,
    ...customerRouteMapper,
    ...companyRouteMapper,
  ])

  return (
    <Suspense fallback={''}>

      {mainRouteMapper}

    </Suspense>
  )
}
