import React, { PropsWithChildren, useMemo } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Link as RebassLink } from 'rebass'
import { theme } from '@/components/Layout/theme'

type TProps = PropsWithChildren<{
  as?: string
  exact?: boolean
  href: string
  nav?: boolean
  unstyled?: boolean
}>

const withoutStyle = {
  color: 'inherit',
  textDecoration: 'none',
}

const activeStyle = {
  color: theme.colors.secondary,
}

export const Link = ({ as, exact = false, children, href, nav = false, unstyled = false }: TProps) => {
  const router = useRouter()
  const style = useMemo(
    () => (
      exact
        ? router.asPath === href ? activeStyle : {}
        : href !== '/' && router.asPath.includes(href) ? activeStyle : {}
    ),
    [exact, href, router],
  )

  if (unstyled) {
    return (
      <NextLink as={as} href={href} passHref>
        <RebassLink style={withoutStyle}>
          {children}
        </RebassLink>
      </NextLink>
    )
  }

  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink {...(nav ? { variant: 'nav' } : {})} style={style}>
        {children}
      </RebassLink>
    </NextLink>
  )
}
