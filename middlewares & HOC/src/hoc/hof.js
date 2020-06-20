const numbers = [1,2,3,4,5]

function creatAddNumber(number) {
    return function (arr) {
        return arr.map(item => item + number)
    }
}

const addOne = creatAddNumber(1)

addOne(numbers)

const addFive = creatAddNumber(5)

addFive(numbers)
