const listPrefix = 'list-';
const titlePrefix = 'title-';
const valuesPrefix = 'values-';

const getPlainValues = inputs => inputs
  .filter(input => input.id && input.id.indexOf(listPrefix) === -1)
  .reduce((json, input) => ({
    ...json,
    [input.id]: input.value,
  }), {});

const listTitleMatcher = new RegExp(`^${listPrefix}${titlePrefix}(\\w+)-\\d`);
const listTitlePrefixMatch = new RegExp(`^${listPrefix}${titlePrefix}`);

const getListValues = inputs => inputs
  .filter(input => input.id && listTitleMatcher.test(input.id))
  .reduce((json, input) => {
    const name = listTitleMatcher.exec(input.id)[1];
    const existing = json[name] ? json[name] : [];
    const title = input.value;
    const values = inputs
      .find(i => i.id === input.id.replace(listTitlePrefixMatch, `${listPrefix}${valuesPrefix}`))
      .value
      .trim()
      .split('\n');

    return { ...json, [name]: [...existing, { title, values }] };
  }, {});

const values = obj => Object.keys(obj).map(key => obj[key]);


// form should be event.target on form submit
export default form => ({
  ...getPlainValues(values(form)),
  ...getListValues(values(form)),
});
