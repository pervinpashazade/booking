import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
    key: 'root-booking',
    storage: storage,
    whitelist: [
        'staticData',
    ]
};

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const pReducer = persistReducer(persistConfig, reducer);
const store = createStore(pReducer, bindMiddleware([thunkMiddleware]));

const persistor = persistStore(store);
export { persistor, store };

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;