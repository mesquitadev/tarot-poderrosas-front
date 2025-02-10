import { Switch } from 'react-router-dom';
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
import Route from './Route';
import React from 'react';

function Routes() {
  return (
    // @ts-ignore
    <Switch>
      <Route exact path='/' component={SignUp} />
      <Route exact path='/ativar-conta' component={ActivateAccount} />
      <Route exact isPrivate path='/inicio' component={Home} />
      <Route exact isPrivate path='/tarot' component={Tarot} />
      <Route exact isPrivate path='/tarot/carta-do-dia' component={CardOfDay} />
      <Route exact isPrivate path='/tarot/tres-cartas' component={ThreeCards} />
      <Route exact isPrivate path='/tarot/cinco-cartas' component={FiveCards} />
      <Route exact isPrivate path='/tarot/baralho' component={AllCards} />
      <Route exact isPrivate path='/minhas-anotacoes' component={MinhasAnotacoes} />
      <Route exact isPrivate path='/minhas-anotacoes/nova' component={NovaAnotacao} />
      <Route exact isPrivate path='/minhas-anotacoes/editar/:id' component={EditarAnotacao} />
      <Route exact isPrivate path='/desafio-do-dia' component={DesafioDoDia} />
      <Route exact isPrivate path='/cartas' component={AllCards} />
      <Route exact isPrivate path='/cartas/nova' component={NewCard} />
      <Route path='*' component={NotFound} />
    </Switch>
  );
}

export default Routes;
