// O'zbek tili (Lotin) - Barcha tarjimalar
import common from './common.json';
import auth from './features/auth.json';
import autoTransport from './features/auto-transport.json';
import dashboard from './features/dashboard.json';
import users from './features/users.json';
import navigation from './navigation.json';

const uzTranslations = {
  ...common,
  ...auth,
  ...autoTransport,
  ...dashboard,
  ...users,
  ...navigation,
};

export default uzTranslations;
