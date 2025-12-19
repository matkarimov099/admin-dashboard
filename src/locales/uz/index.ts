// O'zbek tili (Lotin) - Barcha tarjimalar
import common from './common.json';
import auth from './features/auth.json';
import autoTransport from './features/auto-transport.json';
import tasks from './features/tasks.json';
import users from './features/users.json';
import dashboard from './features/dashboard.json';
import profile from './features/profile.json';

const uzTranslations = {
  ...common,
  ...auth,
  ...autoTransport,
  ...tasks,
  ...users,
  ...dashboard,
  ...profile
};

export default uzTranslations;