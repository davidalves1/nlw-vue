import {Request, Response} from 'express'

import db from '../database/connection'
import { convertHoursToMinutes } from '../utils/time';
import { parseRequestToDatabase, parseDatabaseToResponse } from '../utils/objectTransform';

interface ScheduleItem {
  weekDay: number;
  from: string;
  to: string;
}

interface queryFilters {
  weekDay?: string
  subject?: string
  time?: string
}

class ClassController {
  async index(req: Request, res: Response) {
    const { weekDay, subject, time }: queryFilters = req.query

    if (!weekDay || !subject || !time ) {
      return res.status(400).json({
        error: 'All filters should be passed'
      })
    }

    const hourInMinutes = convertHoursToMinutes(time);

    const classes = await db.table('classes')
      .select(['classes.*', 'users.*'])
      .join('users', 'users.id', '=', 'classes.user_id')
      .whereExists(function () {
        this.select(['class_schedules.*'])
          .from('class_schedules')
          .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedules`.`week_day` = ??', [Number(weekDay)])
          .whereRaw('`class_schedules`.`from` <= ??', [Number(hourInMinutes)])
          .whereRaw('`class_schedules`.`to` > ??', [Number(hourInMinutes)])
      })
      .where('classes.subject', '=', subject as string)

    return res.json(classes.map(classItem => parseDatabaseToResponse(classItem)))
  }

  async create(req: Request, res: Response) {
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
        error: 'Some field is invalid or not exists'
      })
    }

    const user = await db.table('users')
      .where({ whatsapp })
      .first()

    if (user) res.status(409).json({
        error: 'The user exists'
      })

    const trx = await db.transaction();

    try {
      const insertedUserIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })

      const userId = insertedUserIds[0]

      const insertedClassesIds = await trx('classes').insert(parseRequestToDatabase({
        userId,
        subject,
        cost,
      }))

      const classId = insertedClassesIds[0]

      const classSchedule = schedule.map((item: ScheduleItem) => {
        return parseRequestToDatabase({
          classId: classId,
          weekDay: item.weekDay,
          from: convertHoursToMinutes(item.from),
          to: convertHoursToMinutes(item.to),
        })
      })

      await trx('class_schedules').insert(classSchedule)

      await trx.commit()

      return res.status(201).send()
    } catch (error) {
      await trx.rollback()
      console.log(error)
      return res.status(400).json({
        error: 'Expected error on create new user'
      })
    }
  }
}

export default ClassController
