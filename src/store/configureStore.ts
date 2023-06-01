import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import storage from 'redux-persist/lib/storage';
import { createReducer } from './reducers';
import {
  coinTransform,
  profileTransform,
  projectTransform,
  rechargeTransform,
  stakeTransform,
  systemTransform,
  transactionTransform,
  walletTransform,
  withdrawTransform,
} from './transform';

export function configureAppStore() {
  // const passwordTransform = createTransform(
  //   (inboundState: AuthState | FilterState, key) => {
  //     return { ...inboundState };
  //   },
  //   (outboundState, key) => {
  //     return { ...outboundState };
  //   },
  //   { whitelist: ['auth, filter', 'location'] },
  // );
  const persistConfig: any = {
    key: 'user',
    version: 1,
    storage: storage,
    // blacklist: ['stake', 'coin', 'project'], // navigation will not be persisted
    transforms: [
      projectTransform,
      stakeTransform,
      coinTransform,
      walletTransform,
      transactionTransform,
      profileTransform,
      rechargeTransform,
      withdrawTransform,
      systemTransform,
    ],
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    migrate: state => {
      return Promise.resolve(state);
    },
  };

  const persistedReducer = persistReducer(persistConfig, createReducer());
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = configureStore({
    reducer: persistedReducer,
    middleware: defaultMiddleware => [
      ...defaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}
export const store = configureAppStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
