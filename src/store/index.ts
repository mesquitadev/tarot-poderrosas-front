import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

// API SLICES
import { apiSlice } from '@/services/apiSlice';

// GLOBAL STATES
import uiReducer from './uiSlice';
import { cardsApiSlice } from '@/services/cardsApiSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cards: cardsApiSlice.reducer,
  ui: uiReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignora actions e paths específicos do RTK Query e do projeto Tarot
          ignoredActions: [
            // RTK Query actions
            'api/executeQuery/pending',
            'api/executeQuery/fulfilled',
            'api/executeQuery/rejected',
            'api/executeMutation/pending',
            'api/executeMutation/fulfilled',
            'api/executeMutation/rejected',
            // Tarot specific actions
            'ui/openVideoModal',
            'ui/openAddNoteModal',
            'ui/setModalComponent',
            // Persist actions (se usar redux-persist no futuro)
            'persist/PERSIST',
            'persist/REHYDRATE',
          ],
          ignoredPaths: [
            // RTK Query cache paths
            'api.queries',
            'api.mutations',
            // Tarot specific paths
            'api.queries.getRandomCard',
            'api.queries.getThreeRandomCards',
            'api.queries.getFiveRandomCards',
            'api.queries.getDiaryEntries',
            'api.queries.getMissions',
            // UI paths que podem conter componentes React
            'ui.modal.component',
            'ui.modal.videoUrl',
          ],
          // Ignora ações que começam com esses prefixos
          ignoredActionPaths: ['payload.timestamp', 'meta.arg.originalArgs'],
        },
        // Configurações de performance
        immutableCheck: {
          // Ignora paths que podem ser grandes
          ignoredPaths: ['api.queries', 'api.mutations'],
        },
      }).concat(apiSlice.middleware),

    // Configurações de performance
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers({
        autoBatch: true, // Habilita batching automático
      }),
  });

  // Habilita funcionalidades automáticas do RTK Query
  setupListeners(store.dispatch);

  return store;
};

// Store principal da aplicação
export const store = setupStore();

// Types otimizados
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Export para facilitar testes
export { rootReducer };
