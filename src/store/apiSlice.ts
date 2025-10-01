import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services';

// Tipos
export interface Card {
  id: string;
  name: string;
  meaning: string;
  image: string;
  description: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface ApiState {
  // Cards
  cards: Card[];
  randomCard: Card | null;
  selectedCards: Card[];
  cardsLoading: boolean;
  cardsError: string | null;

  // Missions
  missions: Mission[];
  missionsLoading: boolean;
  missionsError: string | null;

  // Diary
  diaryEntries: DiaryEntry[];
  selectedDiary: DiaryEntry | null;
  diaryLoading: boolean;
  diaryError: string | null;
}

const initialState: ApiState = {
  cards: [],
  randomCard: null,
  selectedCards: [],
  cardsLoading: false,
  cardsError: null,

  missions: [],
  missionsLoading: false,
  missionsError: null,

  diaryEntries: [],
  selectedDiary: null,
  diaryLoading: false,
  diaryError: null,
};

// Thunks para Cards
export const fetchCards = createAsyncThunk(
  'api/fetchCards',
  async () => {
    const response = await api.get('/cards');
    return response.data;
  }
);

export const fetchRandomCard = createAsyncThunk(
  'api/fetchRandomCard',
  async () => {
    const response = await api.get('/cards', {
      params: {
        limit: 1,
        random: true,
      },
    });
    return response.data;
  }
);

export const fetchMultipleRandomCards = createAsyncThunk(
  'api/fetchMultipleRandomCards',
  async (count: number) => {
    const response = await api.get('/cards', {
      params: {
        limit: count,
        random: true,
      },
    });
    return response.data;
  }
);

// Thunks para Missions
export const fetchMissions = createAsyncThunk(
  'api/fetchMissions',
  async () => {
    const response = await api.get('/missions');
    return response.data;
  }
);

// Thunks para Diary
export const fetchDiaryEntry = createAsyncThunk(
  'api/fetchDiaryEntry',
  async (id: string) => {
    const response = await api.get(`/diary/${id}`);
    return response.data;
  }
);

export const fetchDiaryEntries = createAsyncThunk(
  'api/fetchDiaryEntries',
  async () => {
    const response = await api.get('/diary');
    return response.data;
  }
);

export const createDiaryEntry = createAsyncThunk(
  'api/createDiaryEntry',
  async (entry: Omit<DiaryEntry, 'id'>) => {
    const response = await api.post('/diary', entry);
    return response.data;
  }
);

export const updateDiaryEntry = createAsyncThunk(
  'api/updateDiaryEntry',
  async ({ id, entry }: { id: string; entry: Partial<DiaryEntry> }) => {
    const response = await api.put(`/diary/${id}`, entry);
    return response.data;
  }
);

export const deleteDiaryEntry = createAsyncThunk(
  'api/deleteDiaryEntry',
  async (id: string) => {
    await api.delete(`/diary/${id}`);
    return id;
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    clearRandomCard: (state) => {
      state.randomCard = null;
    },
    clearSelectedCards: (state) => {
      state.selectedCards = [];
    },
    setSelectedCards: (state, action: PayloadAction<Card[]>) => {
      state.selectedCards = action.payload;
    },
    clearErrors: (state) => {
      state.cardsError = null;
      state.missionsError = null;
      state.diaryError = null;
    },
  },
  extraReducers: (builder) => {
    // Cards
    builder
      .addCase(fetchCards.pending, (state) => {
        state.cardsLoading = true;
        state.cardsError = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.cardsLoading = false;
        state.cardsError = action.error.message || 'Erro ao buscar cartas';
      })

      .addCase(fetchRandomCard.pending, (state) => {
        state.cardsLoading = true;
        state.cardsError = null;
      })
      .addCase(fetchRandomCard.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.randomCard = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      })
      .addCase(fetchRandomCard.rejected, (state, action) => {
        state.cardsLoading = false;
        state.cardsError = action.error.message || 'Erro ao buscar carta aleatória';
      })

      .addCase(fetchMultipleRandomCards.pending, (state) => {
        state.cardsLoading = true;
        state.cardsError = null;
      })
      .addCase(fetchMultipleRandomCards.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.selectedCards = action.payload;
      })
      .addCase(fetchMultipleRandomCards.rejected, (state, action) => {
        state.cardsLoading = false;
        state.cardsError = action.error.message || 'Erro ao buscar cartas aleatórias';
      })

    // Missions
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.missionsLoading = true;
        state.missionsError = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.missionsLoading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.missionsLoading = false;
        state.missionsError = action.error.message || 'Erro ao buscar missões';
      })

    // Diary
    builder
      .addCase(fetchDiaryEntry.pending, (state) => {
        state.diaryLoading = true;
        state.diaryError = null;
      })
      .addCase(fetchDiaryEntry.fulfilled, (state, action) => {
        state.diaryLoading = false;
        state.selectedDiary = action.payload;
      })
      .addCase(fetchDiaryEntry.rejected, (state, action) => {
        state.diaryLoading = false;
        state.diaryError = action.error.message || 'Erro ao buscar entrada do diário';
      })

      .addCase(fetchDiaryEntries.pending, (state) => {
        state.diaryLoading = true;
        state.diaryError = null;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.diaryLoading = false;
        state.diaryEntries = action.payload;
      })
      .addCase(fetchDiaryEntries.rejected, (state, action) => {
        state.diaryLoading = false;
        state.diaryError = action.error.message || 'Erro ao buscar entradas do diário';
      })

      .addCase(createDiaryEntry.pending, (state) => {
        state.diaryLoading = true;
        state.diaryError = null;
      })
      .addCase(createDiaryEntry.fulfilled, (state, action) => {
        state.diaryLoading = false;
        state.diaryEntries.push(action.payload);
      })
      .addCase(createDiaryEntry.rejected, (state, action) => {
        state.diaryLoading = false;
        state.diaryError = action.error.message || 'Erro ao criar entrada do diário';
      })

      .addCase(updateDiaryEntry.fulfilled, (state, action) => {
        const index = state.diaryEntries.findIndex(entry => entry.id === action.payload.id);
        if (index !== -1) {
          state.diaryEntries[index] = action.payload;
        }
        if (state.selectedDiary?.id === action.payload.id) {
          state.selectedDiary = action.payload;
        }
      })

      .addCase(deleteDiaryEntry.fulfilled, (state, action) => {
        state.diaryEntries = state.diaryEntries.filter(entry => entry.id !== action.payload);
        if (state.selectedDiary?.id === action.payload) {
          state.selectedDiary = null;
        }
      });
  },
});

export const { clearRandomCard, clearSelectedCards, setSelectedCards, clearErrors } = apiSlice.actions;
export default apiSlice.reducer;
