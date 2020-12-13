import firebase from 'firebase';
import { AnyAction, Dispatch } from 'redux';

import { IServices } from '../services';
import { storage } from '../services/firebase';
import { download } from '../utils'

const START = 'posts/fetch-start';
const SUCCESS = 'posts/fetch-success';
const ERROR = 'posts/fetch-error';
const ADD = 'posts/add';

export interface IPost {
    comment: string,
    userId: string,
    createdAt: firebase.firestore.Timestamp,
    imageUrl: string
}

export interface IDataPosts {
    [key: string]: IPost
}
const fetchStart = () => ({
    type: START,
})
const fetchSuccess = (payload: IDataPosts) => ({
    payload,
    type: SUCCESS,
})
const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})
const add = (payload: IDataPosts) => ({
    payload,
    type: ADD,
})

const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true
            }
        case SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false,
            }
        case ERROR:
            return {
                ...state,
                error: action.error,
                fetching: false,
            }
        case ADD:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            }
        //siempre retornar el state, o si no redux falla
        default:
            return state
    }
}

export const fetchPosts = () =>
    async (dispatch: Dispatch, getState: () => any, { db }: IServices) => {
        dispatch(fetchStart())
        try {
            const snaps = await db.collection('posts').get();
            const posts: any = {};
            snaps.forEach(x => posts[x.id] = x.data())
            const imgIds = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const ref = storage.ref(`posts/${x}.jpg`);
                    const url = await ref.getDownloadURL()
                    return [x, url];
                }));
            const keyedImages: any = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1])

            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageUrl: keyedImages[x],
            })
            console.log(posts)
            dispatch(fetchSuccess(posts));
        } catch (error) {
            console.log(error)
            dispatch(fetchError(error))
        }
    }

export const like = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        await fetch(`/api/posts/${id}/like`, {
            headers: {
                authorization: token
            }
        })
    }
export const share = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth, db, storage }: IServices) => {
        if (!auth.currentUser) {
            return
        }
        const token = await auth.currentUser.getIdToken()
        const result = await fetch(`/api/posts/${id}/share`, {
            headers: {
                authorization: token
            }
        })
        const url = await storage.ref(`/posts/${id}.jpg`).getDownloadURL();
        const blob = await download(url)

        const { id: postId }: { id: string } = await result.json();
        const ref = await storage.ref(`posts/${postId}.jpg`)
        if (blob instanceof Blob)
            await ref.put(blob);
        const imageUrl = await ref.getDownloadURL();
        const snap = await db.collection('posts').doc(postId).get();
        dispatch(add({
            [snap.id]: {
                ...snap.data(),
                imageUrl
            }
        } as IDataPosts))

    }

