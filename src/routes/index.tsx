import { Switch } from 'react-router-dom';
import { ConfirmAccount, SignIn, SignUp } from '@/pages';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={SignUp} />
      {/*<Route exact path='/' component={SignIn} />*/}
      <Route exact path='/confirm-account' component={ConfirmAccount} />
      {/* <Route exact path='/confirm' component={Confirm} />
      <Route exact path='/save-to-later' component={SaveToLater} />
      <Route exact path='/pending-subscription' component={PendingSubscription} />
      <Route exact path='/continue' component={Continue} /> */}
      {/*<Route exact path='/home' isPrivate component={Home} />*/}
    </Switch>
  );
}

export default Routes;
