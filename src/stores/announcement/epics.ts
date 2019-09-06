import { Epic } from 'redux-observable'
import { isActionOf, RootAction, RootState, Services } from 'typesafe-actions'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { getAnnouncements, addAnnouncement } from './actions'

export const getAnnouncementsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    // isActionOf 接收 action-creator 并将第二个参数传递下去
    filter(isActionOf(getAnnouncements.request)),
    switchMap(action =>
      AnnoucementServices.getAnnouncements().pipe(
        map(getAnnouncements.success),
        takeUntil(action$.pipe(filter(isActionOf(getAnnouncements.cancel)))),
        catchError((message: string) => of(getAnnouncements.failure(message))),
      ),
    ),
  )

// export const addAnnouncementEpic: Epic<
//   RootAction,
//   RootAction,
//   RootState,
//   Services
// > = (action$, state$, { AnnoucementServices }) =>
//   action$.pipe(
//     filter(isActionOf(addAnnouncement.request)),
//     switchMap(action =>
//       AnnoucementServices.addAnnouncement(action.payload.announcement).pipe(
//         map(addAnnouncement.success),
//         takeUntil(action$.pipe(filter(isActionOf(addAnnouncement.cancel)))),
//         catchError((message: string) => of(addAnnouncement.failure(message))),
//       ),
//     ),
//   )
