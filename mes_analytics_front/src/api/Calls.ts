
import { type ElectionFormOptions } from '../interfaces/types'

const url = 'http://localhost:8000'

async function fetchPredefinedAnalytics (
  election: string,
  options: ElectionFormOptions
): Promise<[ok: boolean, data: string]> {
  const flags = await prepareFlags(options)
  return await fetchWithoutBody(`mes/${election}${flags}`, 'GET')
}

async function fetchUploadedAnalytics (
  election: File,
  options: ElectionFormOptions
): Promise<[ok: boolean, data: string]> {
  const flags = await prepareFlags(options)
  return await fetchWithFileBody(`mes/upload${flags}`, 'POST', election)
}

async function prepareFlags (options: ElectionFormOptions): Promise<string> {
  const nameMap = new Map<keyof ElectionFormOptions, string>([
    ['exhaust', 'exhaust'],
    ['feasibileExhaust', 'feasible-stop'],
    ['effSupport', 'eff-support']
  ])
  const trueFlags = Object.keys(options).filter(option => options[option as keyof ElectionFormOptions]).map(option => nameMap.get(option as keyof ElectionFormOptions))
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
