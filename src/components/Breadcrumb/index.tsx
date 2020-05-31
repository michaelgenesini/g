import React, { useMemo, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text } from 'rebass'
import { Link } from '@/components/Link'

const generateBreadcrumb = (route: string) => route
  .split('/')
  .filter(Boolean)
  .reduce<string[]>(
    (accumulator, partialRoute) => accumulator.concat(`${accumulator.join('/')}/${partialRoute}`),
    [],
  )

export const BreadCrumb = () => {
  const router = useRouter()
  const crumbs = useMemo(
    () => generateBreadcrumb(router.asPath),
    [router.asPath],
  )

  if (crumbs.length < 2) {
    return null
  }

  return (
    <Flex alignItems="center">
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb}>
          {!!index && <Text>/</Text>}

          <Link href={crumb} nav exact>
            {crumb.replace('/', '')}
          </Link>
        </Fragment>
      ))}
    </Flex>
  )
}
