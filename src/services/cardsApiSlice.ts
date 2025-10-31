import { apiSlice } from './apiSlice';

export interface CardData {
  id?: string | number;
  card: string;
  title: string;
  subtitle: string;
  affirmation: string;
  img: string;
  suggestedMusic: string;
  blend: string;
  power: string;
  incense: string;
}

const transformCardResponse = (response: any): CardData[] => {
  const cards = Array.isArray(response) ? response : response?.cards || [];
  return cards.map((card: any) => ({
    id: card?.id,
    card: card?.card || '',
    title: card?.title || '',
    subtitle: card?.subtitle || '',
    affirmation: card?.affirmation || '',
    img: card?.img || '',
    suggestedMusic: card?.suggestedMusic || '',
    blend: card?.blend || '',
    power: card?.power || '',
    incense: card?.incense || '',
  }));
};

export const cardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1 carta aleatória
    getRandomCard: builder.query<CardData[], void>({
      query: () => ({
        url: '/cards',
        params: { limit: 1, random: true },
      }),
      providesTags: ['Cards'],
      transformResponse: transformCardResponse,
    }),

    // 3 cartas aleatórias
    getThreeRandomCards: builder.query<CardData[], void>({
      query: () => ({
        url: '/cards',
        params: { limit: 3, random: true },
      }),
      providesTags: ['Cards'],
      transformResponse: transformCardResponse,
    }),

    // 5 cartas aleatórias
    getFiveRandomCards: builder.query<CardData[], void>({
      query: () => ({
        url: '/cards',
        params: { limit: 5, random: true },
      }),
      providesTags: ['Cards'],
      transformResponse: transformCardResponse,
    }),
  }),
});

export const {
  useGetRandomCardQuery,
  useGetThreeRandomCardsQuery,
  useGetFiveRandomCardsQuery,
  useLazyGetRandomCardQuery,
  useLazyGetThreeRandomCardsQuery,
  useLazyGetFiveRandomCardsQuery,
} = cardsApiSlice;
