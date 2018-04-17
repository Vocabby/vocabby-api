import log from '../logger'

export function parseHeader(authHeader: string) {
    if (!authHeader) {
        return null
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
        log.debug('Bad Authorization header format.')
        return null
    }

    const scheme = parts[0]
    const token = parts[1]

    if (/^Bearer$/i.test(scheme) === false) {
        log.debug('Missing authorization token')
        return null
    }

    return token
}
