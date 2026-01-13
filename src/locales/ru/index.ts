// Русский язык - Все переводы
import common from './common.json';
import auth from './features/auth.json';
import cargoCustomDeclaration from './features/cargo-custom-declaration.json';
import dashboard from './features/dashboard.json';
import users from './features/users.json';
import navigation from './navigation.json';

const ruTranslations = {
  ...common,
  ...auth,
  ...cargoCustomDeclaration,
  ...dashboard,
  ...users,
  ...navigation,
};

export default ruTranslations;
