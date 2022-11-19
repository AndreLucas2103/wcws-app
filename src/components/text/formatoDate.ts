import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
/* import { store } from "../../redux/store"; */

dayjs.extend(utc)

interface IDateOptions {
    format?: string,
    timezone?: number, // de -16 a +16
    addMonth?: number,
    addYear?: number,
    addDay?: number,
    addHour?: number,
    addMinute?: number,
    addSecond?: number,
    returnStartOf?: 'day' | 'month' | 'year',
    returnEndOf?: 'day' | 'month' | 'year',
}

export const dateString = (data: string | Date, options?: IDateOptions): string => {
    /* const { unidade: { unidade } } = store.getState() */

    if (typeof data === "string") {
        data = new Date(data)
    }

    if (!options) options = {}

    /* const timezone = options.timezone === 0 ? 0 : unidade.timezone ? unidade.timezone : "-00:00" */
    if (options.addMonth) data = dayjs(data).add(options.addMonth, 'month').format()
    if (options.addYear) data = dayjs(data).add(options.addYear, 'year').format()
    if (options.addDay) data = dayjs(data).add(options.addDay, 'day').format()
    if (options.addHour) data = dayjs(data).add(options.addHour, 'hour').format()
    if (options.addMinute) data = dayjs(data).add(options.addMinute, 'minute').format()
    if (options.addSecond) data = dayjs(data).add(options.addSecond, 'second').format()

    if (options.returnStartOf) data = dayjs(data).startOf(options.returnStartOf).format()
    if (options.returnEndOf) data = dayjs(data).endOf(options.returnEndOf).format()

    /* .utcOffset(timezone) */
    return dayjs(data)
        .format(options.format || undefined)
}
