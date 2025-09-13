import { apiSlice } from './apiSlice';
import { Mission } from './missionsApiSlice';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  startDate: string;
  endDate: string;
  missions: Mission[];
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  rewards: {
    points: number;
    badges: string[];
    unlocks: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface WeeklyChallenge extends Challenge {
  weekOfYear: number;
  year: number;
  dailyTasks: {
    day: string;
    date: string;
    missions: Mission[];
    completed: boolean;
  }[];
}

export interface ChallengeProgress {
  challengeId: string;
  missionId: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

const transformChallengeResponse = (response: any): Challenge => {
  return {
    id: response?.id || '',
    title: response?.title || '',
    description: response?.description || '',
    type: response?.type || 'daily',
    difficulty: response?.difficulty || 'easy',
    points: response?.points || 0,
    completed: Boolean(response?.completed),
    startDate: response?.startDate || '',
    endDate: response?.endDate || '',
    missions: Array.isArray(response?.missions) ? response.missions : [],
    progress: {
      current: response?.progress?.current || 0,
      total: response?.progress?.total || 0,
      percentage: response?.progress?.percentage || 0,
    },
    rewards: {
      points: response?.rewards?.points || 0,
      badges: Array.isArray(response?.rewards?.badges) ? response.rewards.badges : [],
      unlocks: Array.isArray(response?.rewards?.unlocks) ? response.rewards.unlocks : [],
    },
    createdAt: response?.createdAt,
    updatedAt: response?.updatedAt,
  };
};

export const challengeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Buscar todos os desafios
    getChallenges: builder.query<Challenge[], { type?: string; status?: string }>({
      query: (params = {}) => ({
        url: '/challenges',
        params,
      }),
      providesTags: ['Challenges'],
      transformResponse: (response: any): Challenge[] => {
        const challenges = Array.isArray(response) ? response : response?.challenges || [];
        return challenges.map(transformChallengeResponse);
      },
    }),

    // Buscar desafio específico
    getChallenge: builder.query<Challenge, string>({
      query: (id) => ({
        url: `/challenges/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Challenges', id }],
      transformResponse: transformChallengeResponse,
    }),

    // Buscar desafio semanal atual
    getCurrentWeekChallenge: builder.query<WeeklyChallenge, void>({
      query: () => ({
        url: '/challenges/current-week',
      }),
      providesTags: ['Challenges', 'CurrentWeek'],
      transformResponse: (response: any): WeeklyChallenge => {
        return {
          ...transformChallengeResponse(response),
          weekOfYear: response?.weekOfYear || 0,
          year: response?.year || new Date().getFullYear(),
          dailyTasks: Array.isArray(response?.dailyTasks) ? response.dailyTasks : [],
        };
      },
    }),

    // Marcar missão do desafio como completa
    completeMission: builder.mutation<
      ChallengeProgress,
      { challengeId: string; missionId: string; notes?: string }
    >({
      query: ({ challengeId, missionId, notes }) => ({
        url: `/challenges/${challengeId}/missions/${missionId}/complete`,
        method: 'POST',
        body: { notes },
      }),
      invalidatesTags: (_result, _error, { challengeId }) => [
        'Challenges',
        'CurrentWeek',
        { type: 'Challenges', id: challengeId },
        'Missions',
      ],
      transformResponse: (response: any): ChallengeProgress => {
        return {
          challengeId: response?.challengeId || '',
          missionId: response?.missionId || '',
          completed: Boolean(response?.completed),
          completedAt: response?.completedAt,
          notes: response?.notes,
        };
      },
    }),

    // Desmarcar missão do desafio
    uncompleteMission: builder.mutation<
      ChallengeProgress,
      { challengeId: string; missionId: string }
    >({
      query: ({ challengeId, missionId }) => ({
        url: `/challenges/${challengeId}/missions/${missionId}/uncomplete`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { challengeId }) => [
        'Challenges',
        'CurrentWeek',
        { type: 'Challenges', id: challengeId },
        'Missions',
      ],
      transformResponse: (response: any): ChallengeProgress => {
        return {
          challengeId: response?.challengeId || '',
          missionId: response?.missionId || '',
          completed: Boolean(response?.completed),
          completedAt: response?.completedAt,
        };
      },
    }),

    // Participar de um desafio
    joinChallenge: builder.mutation<Challenge, string>({
      query: (challengeId) => ({
        url: `/challenges/${challengeId}/join`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, challengeId) => [
        'Challenges',
        { type: 'Challenges', id: challengeId },
      ],
      transformResponse: transformChallengeResponse,
    }),

    // Sair de um desafio
    leaveChallenge: builder.mutation<{ success: boolean }, string>({
      query: (challengeId) => ({
        url: `/challenges/${challengeId}/leave`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, challengeId) => [
        'Challenges',
        { type: 'Challenges', id: challengeId },
      ],
    }),

    // Buscar progresso do desafio
    getChallengeProgress: builder.query<ChallengeProgress[], string>({
      query: (challengeId) => ({
        url: `/challenges/${challengeId}/progress`,
      }),
      providesTags: (_result, _error, challengeId) => [
        { type: 'Challenges', id: challengeId },
        'ChallengeProgress',
      ],
    }),

    // Buscar estatísticas do usuário nos desafios
    getChallengeStats: builder.query<
      {
        totalChallenges: number;
        completedChallenges: number;
        totalPoints: number;
        currentStreak: number;
        badges: string[];
      },
      void
    >({
      query: () => ({
        url: '/challenges/stats',
      }),
      providesTags: ['ChallengeStats'],
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useGetChallengeQuery,
  useGetCurrentWeekChallengeQuery,
  useCompleteMissionMutation,
  useUncompleteMissionMutation,
  useJoinChallengeMutation,
  useLeaveChallengeMutation,
  useGetChallengeProgressQuery,
  useGetChallengeStatsQuery,
  useLazyGetChallengesQuery,
  useLazyGetChallengeQuery,
  useLazyGetCurrentWeekChallengeQuery,
  useLazyGetChallengeProgressQuery,
  useLazyGetChallengeStatsQuery,
} = challengeApiSlice;
