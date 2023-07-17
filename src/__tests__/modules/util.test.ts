import { cx } from '../../modules/util';

describe('cx', () => {
  it('should not render undefined classes', () => {
    const result = cx(undefined);
    expect(result).toBe('');
  });

  it('should concat multiple class names', () => {
    const result = cx('  one two', 'three', ' four five  ');
    expect(result).toBe('one two three four five');
  });

  it('should add conditional classes correctly', () => {
    const result = cx({ yes: true, no: false });
    expect(result).toBe('yes');
  });

  it('should concat conditional and non-conditional classes correctly', () => {
    const result = cx('one', { yes: true, no: false }, 'two', undefined, { yes: true, no: false });
    expect(result).toBe('one yes two yes');
  });
});
