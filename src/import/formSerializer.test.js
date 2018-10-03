import serializeForm from './formSerializer';

describe('plain form', () => {
  let serialized;
  const form = {
    0: { id: 'plain-old-field', value: 'the value of the field' },
    x: 'something else',
    y: { thing: 'object' },
  };

  beforeEach(() => {
    serialized = serializeForm(form);
  });

  it('will serialize non-list values', () => {
    expect(serialized['plain-old-field']).toEqual('the value of the field');
  });
  it('will not serialize non inputs', () => {
    expect(Object.keys(serialized).indexOf('undefined')).toEqual(-1);
  });
});

describe('list form', () => {
  let serialized;
  const form = {
    0: { id: 'list-title-things-0', value: 'Some Things' },
    1: { id: 'list-values-things-0', value: 'One\nTwo\nThree\nFour' },
    2: { id: 'list-title-things-1', value: 'More Things' },
    3: { id: 'list-values-things-1', value: '\nFive' },
  };

  beforeEach(() => {
    serialized = serializeForm(form);
  });

  it('will not serialize things that start with "list-".', () => {
    expect(serialized['list-title-things-0']).toEqual(undefined);
  });

  it('will put things into a new object', () => {
    expect(serialized.things).not.toEqual(undefined);
  });

  it('will sort lists by key', () => {
    expect(Object.keys(serialized).indexOf('things')).not.toEqual(-1);
  });

  it('will put the titles in the things', () => {
    expect(serialized.things[0].title).toEqual('Some Things');
    expect(serialized.things[1].title).toEqual('More Things');
  });

  it('will put the values in the things', () => {
    expect(serialized.things[0].values).toEqual(['One', 'Two', 'Three', 'Four']);
    expect(serialized.things[1].values).toEqual(['Five']);
  });
});
