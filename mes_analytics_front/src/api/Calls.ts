const url = 'http://localhost:8000'

async function fetchPredefinedAnalytics (
  election: string,
  exhaust: boolean,
  effSupport: boolean
): Promise<[ok: boolean, data: string]> {
  const flags = await prepareFlags([{ name: 'exhaust', on: exhaust }, { name: 'eff-support', on: effSupport }])
  return await fetchWithoutBody(`mes/${election}${flags}`, 'GET')
}

async function fetchUploadedAnalytics (
  election: File,
  exhaust: boolean,
  effSupport: boolean
): Promise<[ok: boolean, data: string]> {
  const flags = await prepareFlags([{ name: 'exhaust', on: exhaust }, { name: 'eff-support', on: effSupport }])
  return await fetchWithFileBody(`mes/upload${flags}`, 'POST', election)
}

async function prepareFlags (flags: Array<{ name: string, on: boolean }>): Promise<string> {
  const trueFlags = flags.filter(flag => flag.on).map(flag => flag.name)
  return trueFlags.length === 0 ? '' : '?' + trueFlags.join('&')
}

async function fetchWithoutBody (
  path: string,
  method: string
): Promise<[ok: boolean, data: string]> {
  const requestOptions = {
    method,
    headers: createHeaders('application/json')
  }
  return await fetch(`${url}/${path}`, requestOptions).then(
    async (response) => {
      const res = fetchCheck(response)
      return await res
    }
  )
}

async function fetchWithFileBody (
  path: string,
  method: string,
  body: File
): Promise<[ok: boolean, data: string]> {
  const data = new FormData()
  data.append('file', body)
  const requestOptions = {
    method,
    body: data
  }
  return await fetch(`${url}/${path}`, requestOptions).then(
    async (response) => {
      const res = fetchCheck(response)
      return await res
    }
  )
}

async function fetchCheck (
  response: Response
): Promise<[ok: boolean, data: string]> {
  const data = await response.json()
  if (response.ok) {
    return [true, JSON.stringify(data)]
  } else {
    return [false, data]
  }
}

function createHeaders (contentType: string): {
  'Content-Type': string
} {
  return {
    'Content-Type': contentType
  }
}

export {
  fetchPredefinedAnalytics,
  fetchUploadedAnalytics
}
