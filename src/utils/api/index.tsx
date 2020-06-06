import fetch from 'node-fetch'

type TResponseOk<D extends any> = {
  data: D
  ok: true
}

type TResponseKo = {
  data: null
  ok: false
}

type TResponse<D extends any> = TResponseOk<D> | TResponseKo

export const fetcher = async <T extends any>(url: string, options: any = {}): Promise<TResponse<T>> => {
  try {
    const res = await fetch(url, options)
    const data = await res.json()

    if (data.status !== 'success') {
      throw 'API error: "no success"'
    }

    return {
      data: data.data,
      ok: true,
    } as TResponseOk<T>
  } catch (error) {
    console.error(`Error on "fetcher": ${error}`)

    return {
      data: null,
      ok: false
    } as TResponseKo
  }
}
