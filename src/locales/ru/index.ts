// Русский язык - Все переводы
import common from './common.json';
import auth from './features/auth.json';
import autoTransport from './features/auto-transport.json';
import users from './features/users.json';
import menu from './features/menu.json';
import transit from './pages/transit.json';

const ruTranslations = {
  ...common,
  ...auth,
  ...autoTransport,
  ...users,
  ...menu,
  ...transit
};

export default ruTranslations;