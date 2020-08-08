import { Router } from 'express'
import db from './database/connection'
import { convertHoursToMinutes } from './utils/time';
import { parseRequestToDatabase, parseDatabaseToResponse } from './utils/objectTransform';

const routes = Router()

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.get('/test', (_, res) => {
  let testObj = {};
  for (let i = 0; i < 10; i++) {
    testObj[`testUserName${i}`] = i * 10;
  }
  console.time('requestToDatabase')
  const objRtD = parseRequestToDatabase(testObj)
  console.timeEnd('requestToDatabase')

  console.time('databaseToResponse')
  const objDtR = parseDatabaseToResponse(objRtD)
  console.timeEnd('databaseToResponse')

  return res.json({ rtd: objRtD, dtr: objDtR })
})

routes.post('/classes', async (req, res) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = req.body

  if ([!!name, !!avatar, !!whatsapp, !!bio, !!subject, !!cost, !!schedule].includes(false)) {
    return res.status(422).json({
      error: 'Some field is invalid'
    })
  }

  const trx = await db.transaction();

  try {
    const insertedUserIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    })

    const userId = insertedUserIds[0]

    const insertedClassesIds = await trx('classes').insert({
      user_id: userId,
      subject,
      cost,
    })

    const classId = insertedClassesIds[0]

    const classSchedule = schedule.map((item: ScheduleItem) => {
      return {
        class_id: classId,
        week_day: item.week_day,
        from: convertHoursToMinutes(item.from),
        to: convertHoursToMinutes(item.to),
      }
    })

    await trx('class_schedules').insert(classSchedule)

    await trx.commit()

    return res.status(201)
  } catch (error) {
    await trx.rollback()
    return res.status(400).json({
      error: 'Expected error on create new user'
    })
  }

})

export default routes
