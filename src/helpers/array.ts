export function toHash<T>(array: T[], keySelector: (obj: T) => any = obj => obj) {
  return array.reduce(((map: any, value: T) => {
    map[keySelector(value)] = true
    return map
  }), {})
}
