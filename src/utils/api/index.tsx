import unfetch from 'unfetch'

export const fetcher = async (url: string) => {
  const res = await unfetch(url)
  const data = await res.json()

  return data
}
