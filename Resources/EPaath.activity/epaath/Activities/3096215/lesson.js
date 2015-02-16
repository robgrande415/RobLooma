function instructions() {
    return 'Click and match products and words';
}

function createFaces(karma) {
    var pairs = [
        ['Cow', 'Milk'],
        ['Hen', 'Egg'],
        ['Wood', 'Chair'],
        ['Bee', 'Honey'],
        ['Tap', 'Water'],
        ['House', 'Brick'],
        ['Sheep', 'Wool'],
        ['Cloth', 'Shirt'],
        ['Lamp', 'Light'],
        ['Leather', 'Shoes'],
        ['Wheat', 'Flour'],
        ['Sugar', 'Sweet'],
        ['Rain', 'Cloud'],
        ['Tree', 'Fruit'],
        ['Bottle', 'Glass']
    ];

    var createFirst = function(pair) {
      return createText(pair[0], pair[0]);
    };

    var createSecond = function(pair) {
      return createText(pair[1], pair[0]);
    };

    return Array.prototype.concat(pairs.map(createFirst),
                                  pairs.map(createSecond));
}
