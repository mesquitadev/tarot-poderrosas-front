import { Switch } from 'react-router-dom';
import { CardOfDay, FiveCards, Home, SignUp, Tarot, ThreeCards } from '@/pages';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={SignUp} />
      <Route exact isPrivate path='/inicio' component={Home} />
      <Route exact isPrivate path='/tarot' component={Tarot} />
      <Route exact isPrivate path='/tarot/carta-do-dia' component={CardOfDay} />
      <Route exact isPrivate path='/tarot/tres-cartas' component={ThreeCards} />
      <Route exact isPrivate path='/tarot/cinco-cartas' component={FiveCards} />
      {/*<Route exact path='/politica-privacidade' component={PrivacyPolicy} />*/}
    </Switch>
  );
}

export default Routes;
