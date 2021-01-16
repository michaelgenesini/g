import React from 'react'
import { useForm } from 'react-hook-form'
import { Card, Flex, Box, Heading } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Link } from '@/components/Link'

export const Header = () => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (values: any) => console.log(values)

  return (
    <Flex alignItems="center" justifyContent="space-between" mb={4}>
      <Flex mr={2} flexShrink={0}>
        <Link href="/" nav>
          <Heading as="p">
            G
          </Heading>
        </Link>
      </Flex>

      <Flex flex={1} justifyContent="center">
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          width={1}
        >
          <Input
            name="search"
            ref={register()}
            placeholder="Search..."
            autoComplete="off"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
