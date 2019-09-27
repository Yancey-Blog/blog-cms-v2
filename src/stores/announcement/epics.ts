import { Epic } from 'redux-observable'
import { isActionOf, RootAction, RootState, Services } from 'typesafe-actions'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { goBack } from 'connected-react-router'
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
    switchMap(() =>
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
    switchMap((action: any) => {
      const data = {
        announcement: action.payload.announcement,
      }
      return AnnoucementServices.addAnnouncement(data).pipe(
        switchMap((resp: any) => of(addAnnouncement.success(resp), goBack())),
        takeUntil(action$.pipe(filter(isActionOf(addAnnouncement.cancel)))),
        catchError((message: string) =>
          of(addAnnouncement.failure(message), goBack()),
        ),
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
    switchMap((action: any) => {
      const { payload } = action
      const { id } = payload
      const data = {
        announcement: payload.announcement,
      }
      return AnnoucementServices.updateAnnouncement(id, data).pipe(
        switchMap((resp: any) =>
          of(updateAnnouncement.success(resp), goBack()),
        ),
        takeUntil(action$.pipe(filter(isActionOf(updateAnnouncement.cancel)))),
        catchError((message: string) =>
          of(updateAnnouncement.failure(message), goBack()),
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
    switchMap((action: any) => {
      const { id } = action.payload
      return AnnoucementServices.deleteAnnouncement(id).pipe(
        switchMap((resp: any) =>
          of(deleteAnnouncement.success(resp), goBack()),
        ),
        takeUntil(action$.pipe(filter(isActionOf(deleteAnnouncement.cancel)))),
        catchError((message: string) =>
          of(deleteAnnouncement.failure(message), goBack()),
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
    switchMap((action: any) => {
      const { ids } = action.payload
      return AnnoucementServices.deleteAnnouncements(ids).pipe(
        switchMap((resp: any) =>
          of(deleteAnnouncements.success(resp), goBack()),
        ),
        takeUntil(action$.pipe(filter(isActionOf(deleteAnnouncements.cancel)))),
        catchError((message: string) =>
          of(deleteAnnouncements.failure(message), goBack()),
        ),
      )
    }),
  )
