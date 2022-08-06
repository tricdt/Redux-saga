import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import customHistory from "../utils/history";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import studentReducer from "../features/student/studentSlice";
import cityReducer from "../features/city/citySlice";
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
   auth: authReducer,
   dashboard: dashboardReducer,
   router: connectRouter(customHistory),
   student: studentReducer,
   city: cityReducer
})
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(sagaMiddleware, routerMiddleware(customHistory))
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;