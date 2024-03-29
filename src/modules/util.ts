import { Uuid4 } from '../types/Uuid';

export const cx = (...args: (string | undefined | { [cls: string]: boolean })[]) => {
  const cls = args.reduce((cls: string, arg) => {
    if (!arg) return cls;
    if (typeof arg === 'string') return cls + ' ' + arg;
    Object.entries(arg).forEach(([c, shouldApply]) => {
      if (shouldApply) cls += ' ' + c;
    });
    return cls;
  }, '');
  return cls.replace(/\s{2,}/g, ' ').replace(/(^\s+|\s+$)/g, '');
};

export const randint = (min: number, max?: number) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

export const newUuid = () => {
  return crypto.randomUUID() as Uuid4;
};
