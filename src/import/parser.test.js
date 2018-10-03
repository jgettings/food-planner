import parse from './parser';
import enchiladas from './example.html';
import thaiSalad from './example2.html';

describe('plain recipe', () => {
  const recipe = '<h3>Yummy Foods</h3>'
    + '<div class="instructions"><ol>'
    + '<li>do some stuff</li>'
    + '<li>do other things</li>'
    + '</ol></div>'
    + '<div class="ingredients"><ul>'
    + '<li>1 cup sugar</li>'
    + '<li>2 tbsp flour</li>'
    + '</ul></div>';
  let parsed;

  beforeEach(() => {
    parsed = parse(recipe);
  });

  it('will find the title in the first h-tag', () => {
    expect(parsed.title).toEqual('Yummy Foods');
  });

  it('will return the directions', () => {
    expect(parsed.directions[0].title).toEqual('');
    expect(parsed.directions[0].values).toEqual(['do some stuff', 'do other things']);
  });

  it('will return the ingredients', () => {
    expect(parsed.ingredients[0].title).toEqual('');
    expect(parsed.ingredients[0].values).toEqual(['1 cup sugar', '2 tbsp flour']);
  });
});

describe('empty recipe', () => {
  let parsed;
  beforeEach(() => {
    parsed = parse('');
  });

  it('should default things that don\'t exist', () => {
    expect(parsed.imageUrl).toEqual(null);
    expect(parsed.totalMinutes).toEqual(0);
    expect(parsed.servings).toEqual(null);
    expect(parsed.title).toEqual(null);
  });
  it('should return empty arrays for the arrays', () => {
    expect(parsed.ingredients).toEqual([]);
    expect(parsed.directions).toEqual([]);
  });
});

describe('skinnytaste enchiladas', () => {
  let parsed;
  beforeEach(() => {
    parsed = parse(enchiladas);
  });

  it('will get the correct title', () => {
    expect(parsed.title).toEqual('Chicken Enchiladas');
  });

  it('will have all of the directions', () => {
    expect(parsed.directions[0].values.length).toEqual(7);
    expect(parsed.directions[0].values[0].substring(0, 20)).toEqual('In a medium saucepan');
    expect(parsed.directions[0].values.pop().substring(0, 20)).toEqual('Cover with aluminum ');
  });

  it('will have the image', () => {
    expect(parsed.imageUrl).toEqual('https://www.skinnytaste.com/wp-content/uploads/2011/08/Gina-Skinny-Chicken-Enchiladas-4-3-170x255.jpg');
  });

  it('will include the total time', () => {
    expect(parsed.totalMinutes).toEqual(45);
  });

  it('will include the number of servings', () => {
    expect(parsed.servings).toEqual(8);
  });

  it('will include the amount per serving', () => {
    expect(parsed.perServing).toEqual('1 enchilada');
  });

  describe('ingredients', () => {
    it('will split the ingredient lists', () => {
      expect(parsed.ingredients.length).toEqual(3);
    });

    it('will have custom titles for each list', () => {
      expect(parsed.ingredients[0].title).toEqual('Enchilada Sauce');
      expect(parsed.ingredients[1].title).toEqual('Chicken');
      expect(parsed.ingredients[2].title).toEqual('Enchilada');
    });

    it('will include each list separately', () => {
      expect(parsed.ingredients[0].values.length).toEqual(7);
      expect(parsed.ingredients[1].values.length).toEqual(11);
      expect(parsed.ingredients[2].values.length).toEqual(4);
    });
  });
});

describe('skinnytaste thai salad', () => {
  let parsed;
  beforeEach(() => {
    parsed = parse(thaiSalad);
  });

  it('will have 3 sets of directions', () => {
    expect(parsed.directions.length).toEqual(3);
  });

  it('will set the titles of the directions', () => {
    expect(parsed.directions[0].title).toEqual('Dressing');
    expect(parsed.directions[1].title).toEqual('Shrimp');
    expect(parsed.directions[2].title).toEqual('Salad');
  });

  it('will set the values for the directions', () => {
    expect(parsed.directions[0].values[0].substring(0, 10)).toEqual('In a small');
    expect(parsed.directions[1].values[2].substring(0, 10)).toEqual('Add the sh');
  });
});

describe('time parsing', () => {
  it('will turn hours into minutes', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT4H"/> 123 things</div>');
    expect(parsed.totalMinutes).toEqual(240);
  });
  it('will not die if it is empty', () => {
    const parsed = parse('<div>Total Time: 1</div>');
    expect(parsed.totalMinutes).toEqual(0);
  });
  it('will read 35 minutes with the normal syntax', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT35M"/> 35 Minutes</div>');
    expect(parsed.totalMinutes).toEqual(35);
  });
  it('will read 45 minutes with the weird syntax', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT45Minutes"/> 45 Minutes</div>');
    expect(parsed.totalMinutes).toEqual(45);
  });
  it('will read 0 minutes', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT0"/> 0 Minutes</div>');
    expect(parsed.totalMinutes).toEqual(0);
  });
});
