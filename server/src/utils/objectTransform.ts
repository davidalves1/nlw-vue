interface Accumulator {
  [key: string]: any
}

interface CurrentItem {
  [index: number]: string
}

const convertToSnakeCase = (key: string) => key.replace(/[A-Z]/g, '_$&')
  .toLowerCase()

const convertToCamelCase = (key: string) => key.replace(/(_[a-z])/g, (a) => a.toUpperCase()
  .replace(/_/, ''))

const baseParse = (cb: Function) =>
  (acc: Accumulator, { 0: key, 1: value }: CurrentItem) => Object.assign(acc, {[cb(key)]: value})

export const parseRequestToDatabase = (response: object) => Object.entries(response)
  .reduce(baseParse(convertToSnakeCase), {})

export const parseDatabaseToResponse = (response: object) => Object.entries(response)
  .reduce(baseParse(convertToCamelCase), {})
