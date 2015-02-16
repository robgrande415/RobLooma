function instructions() {
    return 'दुई कोठामा क्लिक गर्दै गुणनखण्ड र गुणनफल मिलाऊ';
}

function createFaces(karma) {
    var pairs = [
        ['3*1', '3'],
        ['3*2', '6'],
        ['3*3', '9'],
        ['3*4', '12'],
        ['3*5', '15'],
        ['3*6', '18'],
        ['3*7', '21'],
        ['3*8', '24'],
        ['3*9', '27'],
        ['3*10', '30'],
        ['3*11', '33'],
        ['3*12', '36'],
        ['3*13', '39'],
        ['3*14', '42'],
        ['3*15', '45']
    ];

    var createFirst = function(pair) {
      return createText(pair[0], pair[1]);
    };

    var createSecond = function(pair) {
      return createText(pair[1], pair[1]);
    };

    return Array.prototype.concat(pairs.map(createFirst),
                                  pairs.map(createSecond));
}

