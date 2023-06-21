import { createHmac } from 'node:crypto'

export function getIdHash(userId: string, secret: string) {
    const hmac = createHmac('sha256', secret)
    hmac.update(userId)
    return hmac.digest('hex')
}

