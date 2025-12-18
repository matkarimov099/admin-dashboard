// Ўзбек тили (Кирилл) - Барча таржималар
import common from './common.json';
import auth from './features/auth.json';
import autoTransport from './features/auto-transport.json';

const uzCyrlTranslations = {
  ...common,
  ...auth,
  ...autoTransport
};

export default uzCyrlTranslations;
