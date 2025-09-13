import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ActivateAccount,
  AllCards,
  CardOfDay,
  DesafioDoDia,
  EditarAnotacao,
  FiveCards,
  Home,
  MinhasAnotacoes,
  NewCard,
  NotFound,
  NovaAnotacao,
  SignUp,
  Tarot,
  ThreeCards,
} from '@/pages';
import { PublicRoute, PrivateRoute } from './Route';
import SignIn from '@/pages/SignIn';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<SignUp />} />
          <Route path='/cadastro' element={<SignIn />} />
          <Route path='/ativar-conta' element={<ActivateAccount />} />
          <Route path='/ativar-conta/:token' element={<ActivateAccount />} />
        </Route>

        <Route path='/inicio' element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/tarot' element={<PrivateRoute />}>
          <Route index element={<Tarot />} />
          <Route path='carta-do-dia' element={<CardOfDay />} />
          <Route path='tres-cartas' element={<ThreeCards />} />
          <Route path='cinco-cartas' element={<FiveCards />} />
          <Route path='baralho' element={<AllCards />} />
        </Route>
        <Route path='/minhas-anotacoes' element={<PrivateRoute />}>
          <Route index element={<MinhasAnotacoes />} />
          <Route path='nova' element={<NovaAnotacao />} />
          <Route path='editar/:id' element={<EditarAnotacao />} />
        </Route>
        <Route path='/desafio-do-dia' element={<PrivateRoute />}>
          <Route index element={<DesafioDoDia />} />
        </Route>
        <Route path='/cartas' element={<PrivateRoute />}>
          <Route index element={<AllCards />} />
          <Route path='nova' element={<NewCard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
