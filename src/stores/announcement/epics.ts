import { Epic } from 'redux-observable'
import { isActionOf, RootAction, RootState, Services } from 'typesafe-actions'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
} from './actions'

export const getAnnouncementsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    filter(isActionOf(getAnnouncements.request)),
    switchMap(action =>
      AnnoucementServices.getAnnouncements().pipe(
        map(getAnnouncements.success),
        takeUntil(action$.pipe(filter(isActionOf(getAnnouncements.cancel)))),
        catchError((message: string) => of(getAnnouncements.failure(message))),
      ),
    ),
  )

export const addAnnouncementEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    filter(isActionOf(addAnnouncement.request)),
    switchMap(action => {
      const data = {
        announcement: action.payload.announcement,
      }
      return AnnoucementServices.addAnnouncement(data).pipe(
        map(addAnnouncement.success),
        takeUntil(action$.pipe(filter(isActionOf(addAnnouncement.cancel)))),
        catchError((message: string) => of(addAnnouncement.failure(message))),
      )
    }),
  )

export const updateAnnouncementEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    filter(isActionOf(updateAnnouncement.request)),
    switchMap(action => {
      const { payload } = action
      const id = payload.id
      const data = {
        announcement: payload.announcement,
      }
      return AnnoucementServices.updateAnnouncement(id, data).pipe(
        map(updateAnnouncement.success),
        takeUntil(action$.pipe(filter(isActionOf(updateAnnouncement.cancel)))),
        catchError((message: string) =>
          of(updateAnnouncement.failure(message)),
        ),
      )
    }),
  )

export const deleteAnnouncementEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    filter(isActionOf(deleteAnnouncement.request)),
    switchMap(action => {
      const id = action.payload.id
      return AnnoucementServices.deleteAnnouncement(id).pipe(
        map(deleteAnnouncement.success),
        takeUntil(action$.pipe(filter(isActionOf(deleteAnnouncement.cancel)))),
        catchError((message: string) =>
          of(deleteAnnouncement.failure(message)),
        ),
      )
    }),
  )

export const deleteAnnouncementsEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { AnnoucementServices }) =>
  action$.pipe(
    filter(isActionOf(deleteAnnouncements.request)),
    switchMap(action => {
      const ids = action.payload.ids
      return AnnoucementServices.deleteAnnouncements(ids).pipe(
        map(deleteAnnouncements.success),
        takeUntil(action$.pipe(filter(isActionOf(deleteAnnouncements.cancel)))),
        catchError((message: string) =>
          of(deleteAnnouncements.failure(message)),
        ),
      )
    }),
  )
