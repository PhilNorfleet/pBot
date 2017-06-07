import { disallow, discard, populate } from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';

const schemaValidator = {
  currencyPair: required
};

const tickersHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default tickersHooks;
