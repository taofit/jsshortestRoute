//run the program in terminal: node fastest.js

function getAutoIncrementPyramid(length) {
    const pyramid = [];
    let start = 1;
    for (let i = 0; i < length; i++) {
        const pyramidRow = [];
        start += i;
        for (let j = 0; j < i + 1; j++) {
            pyramidRow[j] = start + j;
        }
        pyramid[i] = pyramidRow;
    }

    return pyramid;
}

function getRandomNumPyramid(length) {
    const pyramid = [];
    for (let i = 0; i < length; i++) {
        const pyramidRow = [];
        for (let j = 0; j < i + 1; j++) {
            pyramidRow[j] = (Math.floor(Math.random() * 100));
        }
        pyramid[i] = pyramidRow;
    }

    return pyramid;
}

function getSumOfEachSlide(pyramid) {
    const length = pyramid.length;
    const sum = [[pyramid[0][0]]];
    for (let i = 1; i < length; i++) {
        const curRow = pyramid[i];
        for (let j = i; j > -1; j--) {
            if (j == i) {
                sum[j] = [sum[j - 1][0] + curRow[j]];
            } else if (j === 0) {
                sum[j] = [sum[j][0] + curRow[j]];
            } else {
                sum[j] = [...sum[j].map(element => element + curRow[j]), ...sum[j - 1].map(element => element + curRow[j])];
            }
        }
    }

    return sum;
}

function fastest(sumOfEachSlide) {
    const sumList = sumOfEachSlide.reduce((cur, item) => {
        return cur.concat(item);
    });

    let min = sumList[0];
    sumList.forEach(element => {
        if (min > element) {
            min = element;
        }
    })
    return min;
}

function getPyramidList(length) {
    const staticPyramid = [[3],[7,4],[2,4,6,],[8,5,9,3]];
    const anotherStaticPyramid = [
        [75],
        [95, 64],
        [17, 47, 82],
        [18, 35, 87, 10],
        [20, 4, 82, 47, 65],
        [19, 1, 23, 75, 3, 34],
        [88, 2, 77, 73, 7, 63, 67],
        [99, 65, 4, 28, 6, 16, 70, 92],
        [41, 41, 26, 56, 83, 40, 80, 70, 33],
        [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
        [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
        [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
        [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
        [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
        [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
    ]
    return [
        {name:'an auto increment Pyramid:', pyramid: getAutoIncrementPyramid(length)},
        {name:'a random number Pyramid:', pyramid : getRandomNumPyramid(length)},
        {name:'a static Pyramid:', pyramid: staticPyramid},
        {name:'another static Pyramid:', pyramid: anotherStaticPyramid},
    ];
}

getPyramidList(10).forEach(pyramid => console.log(
    pyramid.name,
    pyramid.pyramid,
    `\nshortest path: ${fastest(getSumOfEachSlide(pyramid.pyramid))}\n${'-'.repeat(100)}\n`
    )
);
