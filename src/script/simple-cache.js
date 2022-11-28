const cacheMap = new Map()
const DEFAULT_EXPIRE = 1000 * 60 // 1minute

export const setCacheExpiration = (key, value, expires = DEFAULT_EXPIRE) => {
  cacheMap.set(key, {
    expire: new Date().getTime() + expires,
    value,
  })
  return value
}

export const getCache = key => {
  const cached = cacheMap.get(key)
  if (!cached) return null
  if (cached.expire > new Date().getTime()) return cached.value
  cacheMap.delete(key)
  return null
}
