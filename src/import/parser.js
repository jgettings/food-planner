import cheerio from 'cheerio';
import moment from 'moment';

// Fix weird formats like PT45Minutes, which should be PT45M
const minutes = (timeString = '') => moment.duration(timeString.replace(/Minutes/, 'M')).asMinutes();

const titleCase = str => str.split(' ')
  .map(s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
  .join(' ');

// Strip and format ingredient titles
const title = (titleString = '') => titleCase(titleString.replace(/For (the)*/i, '').replace(/:/, '').trim());

export default (recipe) => {
  const r = cheerio.load(recipe);

  return {
    title: r(':header').first().text() || null,
    ingredients:
      r('.ingredients ul').map((i, list) => ({
        title: title(r('.ingredients p').eq(i).text()),
        values: r(list).find('li').map((j, li) => r(li).text()).get(),
      })).get(),
    directions:
      r('.instructions ol').map((i, list) => ({
        title: title(r('.instructions p').eq(i).text()),
        values: r(list).find('li').map((j, li) => r(li).text()).get(),
      })).get(),
    imageUrl: r('img').first().attr('src') || null,
    totalMinutes: minutes(r('[itemprop=totalTime]').attr('content')),
    servings: parseInt(r('.yield').text(), 10) || null,
    perServing: r('.yield').parent().text()
      .split('Serving Size:')
      .pop(-1)
      .trim(),
  };
};
