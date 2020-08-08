import { parseDatabaseToResponse, parseRequestToDatabase } from './objectTransform';

let testObj: {[key: string]: any} = {};
for (let i = 0; i < 100; i++) {
  testObj[`testUserName${i}`] = i * 10;
}
console.time('requestToDatabase')
const objToDatabase = parseRequestToDatabase(testObj)
console.timeEnd('requestToDatabase')

console.time('databaseToResponse')
parseDatabaseToResponse(objToDatabase)
console.timeEnd('databaseToResponse')

