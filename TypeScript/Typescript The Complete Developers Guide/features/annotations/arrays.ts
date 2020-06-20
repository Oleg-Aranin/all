// const carMakers: string[] = ['ford', 'toyota', 'chevy']
const carMakers = ['ford', 'toyota', 'chevy']

const dates = [new Date(), new Date()]

const carsByMake = [
    ['f150'],
    ['corolla'],
    ['camaro']
]

const carsByMake1: string[][] = [
    ['f150'],
    ['corolla'],
    ['camaro']
]

// Help with inference when extracting values
const car = carMakers[0]
const myCar = carMakers.pop()

// Prevent incompatible values
// carMakers.push(100) будет ошибка

// Help with 'map'
carMakers.map((car: string): string => {
    return car.toLowerCase()
})

//Flexible types
const importantDates = [new Date(), '2030-10-10']
const importantDates2: (Date | string)[] = [new Date()]
