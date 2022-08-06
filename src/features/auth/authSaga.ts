import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { take, fork, delay, put, call } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";
function* handleLogin(payload: LoginPayload) {
   try {
      yield delay(1000)
      localStorage.setItem('access_token', 'fake_token')
      yield put(authActions.loginSuccess({
         id: 1,
         name: 'Easy frontend'
      }))
      yield put(push('/admin'));
   } catch (err) {
      yield put(authActions.loginFailed((err as Error).message))
   }
}

function* handleLogout() {
   try {
      yield delay(500)
      localStorage.removeItem('access_token')
      yield put(authActions.logoutSuccess())
      yield put(push('/login'));
   } catch (err) {
      yield put(authActions.logoutFailed((err as Error).message))
   }
}
function* watchLoginFlow() {
   while (true) {
      const isLoggedIn = Boolean(localStorage.getItem('access_token'));
      if (!isLoggedIn) {
         const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
         yield call(handleLogin, action.payload);
      }
      yield take(authActions.logout.type);
      yield call(handleLogout);
   }
}

export default function* authSaga() {
   yield fork(watchLoginFlow);
}