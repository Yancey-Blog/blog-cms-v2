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
    switchMap(action =>
      AnnoucementServices.getAnnouncement().pipe(
        map(fetchAnnouncements.success),
        takeUntil(action$.pipe(filter(isActionOf(fetchAnnouncements.cancel)))),
        catchError((message: string) =>
          of(fetchAnnouncements.failure(message)),
        ),
      ),
    ),
  )
