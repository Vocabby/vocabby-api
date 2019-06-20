import { clone } from 'ramda'

export const toHash = <T>(array: T[], keySelector: (obj: T) => any = obj => obj) => {
  return array.reduce(((map: any, value: T) => {
    map[keySelector(value)] = true
    return map
  }), {})
}

export const shuffle = <T extends any[]>(array: T) => {
  const arr = clone(array)

  let i = arr.length
  if (i === 0) {
    return arr
  }
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1))
    const tempI = arr[i]
    const tempJ = arr[j]
    arr[i] = tempJ
    arr[j] = tempI
  }
  return arr
}
