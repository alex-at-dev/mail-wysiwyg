import { cx, getNextId } from '../../modules/util';

describe('getNextId', () => {
  it('should return correct ids', () => {
    const results = [getNextId(), getNextId(), getNextId(), getNextId(), getNextId()];
    expect(results[0]).toBe('el-1');
    expect(results[1]).toBe('el-2');
    expect(results[2]).toBe('el-3');
    expect(results[3]).toBe('el-4');
    expect(results[4]).toBe('el-5');
  });

  it('should use custom prefix', () => {
    const results = [
      getNextId('one'),
      getNextId('two'),
      getNextId(),
      getNextId('four'),
      getNextId(),
    ];
    expect(results[0]).toBe('one-6');
    expect(results[1]).toBe('two-7');
    expect(results[2]).toBe('el-8');
    expect(results[3]).toBe('four-9');
    expect(results[4]).toBe('el-10');
  });
});

describe('cx', () => {
  it('should concat multiple class names', () => {
    const result = cx('  one two', 'three', ' four five  ');
    expect(result).toBe('one two three four five');
  });

  it('should add conditional classes correctly', () => {
    const result = cx({ yes: true, no: false });
    expect(result).toBe('yes');
  });

  it('should concat conditional and non-conditional classes correctly', () => {
    const result = cx('one', { yes: true, no: false }, 'two', { yes: true, no: false });
    expect(result).toBe('one yes two yes');
  });
});
