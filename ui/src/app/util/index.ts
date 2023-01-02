export const cookies = (k: string) => {
    const v = document.cookie.match('(^|;)\\s*' + k + '\\s*=\\s*([^;]+)')
    return v ? v.pop() : ''
}