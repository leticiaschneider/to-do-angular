import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter items when there is a match', () => {
    const pipe = new FilterPipe();
    const items = [{ title: 'Apple' }, { title: 'Banana' }, { title: 'Orange' }];
    const searchText = 'Banana';

    const result = pipe.transform(items, searchText);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Banana');
  });

  it('should return empty array when there is no match', () => {
    const pipe = new FilterPipe();
    const items = [{ title: 'Apple' }, { title: 'Banana' }, { title: 'Orange' }];
    const searchText = 'Grapes';

    const result = pipe.transform(items, searchText);

    expect(result.length).toBe(0);
  });

  it('should return input items when either items or searchText is null', () => {
    const pipe = new FilterPipe();
    const items = [{ title: 'Apple' }, { title: 'Banana' }, { title: 'Orange' }];
    const searchText = '';

    const result = pipe.transform(items, searchText);

    expect(result).toEqual(items);
  });
});
