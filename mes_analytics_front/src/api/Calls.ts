const url = 'http://localhost:8000'

async function fetchPredefinedAnalytics (
  election: string,
  exhaust: boolean
): Promise<[ok: boolean, data: string]> {
  return await fetchWithoutBody(`mes/${election}${exhaust ? '?exhaust' : ''}`, 'GET')
}

async function fetchUploadedAnalytics (
  election: File,
  exhaust: boolean
): Promise<[ok: boolean, data: string]> {
  return await fetchWithFileBody(`mes/upload${exhaust ? '?exhaust' : ''}`, 'POST', election)
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
