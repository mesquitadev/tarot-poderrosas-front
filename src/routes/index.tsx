import { Switch } from 'react-router-dom';
import { ConfirmAccount, SignUp, PrivacyPolicy } from '@/pages';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={SignUp} />
      <Route exact path='/sucesso' component={ConfirmAccount} />
      <Route exact path='/politica-privacidade' component={PrivacyPolicy} />
    </Switch>
  );
}

export default Routes;
