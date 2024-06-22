import { 
    Action, 
    AnyAction, 
    Reducer, 
    ThunkAction, 
    combineReducers, 
    configureStore 
} from "@reduxjs/toolkit";

import { todos } from "./reducers";

const appReducer = combineReducers({
    todos
})  

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    return appReducer(state, action);
  };
  
  export const store = configureStore({
    reducer: rootReducer,
  });
  
  export type RootState = ReturnType<typeof appReducer>;
  
  export type AppDispatch = typeof store.dispatch;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  