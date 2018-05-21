import { isNil } from 'ramda';

export const createFSA = (type, basePayload = {}, baseMeta = {}) => {
  if (isNil(type)) throw new Error('All actions must have a type');
  return (payload = {}, meta = {}) => ({
    type,
    payload: {
      ...basePayload,
      ...payload,
    },
    meta: {
      ...baseMeta,
      ...meta,
    },
  });
};
