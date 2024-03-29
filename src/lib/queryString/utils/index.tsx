import querystring from 'query-string'

export const toQueryString = ({ url, params }: { url: string; params: object }) => {
  return `${url}?${querystring.stringify(params, {
    skipEmptyString: true,
  })}`
}
