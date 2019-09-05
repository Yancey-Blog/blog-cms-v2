import { Epic } from 'redux-observable'
import { isActionOf, RootAction, RootState, Services } from 'typesafe-actions'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { fetchAnnouncements } from './actions'

export const fetchAnnouncementsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    filter(isActionOf(fetchAnnouncements.request)),
    switchMap(action => {
      const { page, pageSize } = action.payload
      return AnnoucementServices.getAnnouncements(page, pageSize).pipe(
        map(fetchAnnouncements.success),
        takeUntil(action$.pipe(filter(isActionOf(fetchAnnouncements.cancel)))),
        catchError((message: string) =>
          of(fetchAnnouncements.failure(message)),
        ),
      )
    }),
  )

// isActionOf 接收 action-creator 并将第二个参数传递下去
// 以 fetchAnnouncements.request 为例
// 它的第一个参数，也就是 type 是 announcement/FETCH_ANNOUNCEMENTS_REQUEST
// 第二个参数，也就是 payload 是 page 和 pageSize

// isActionOf 也可以跟一个数组
// 如 filter(isActionOf([add, toggle]))
// 它将 add 和 toggle 的 action 都传递下去
