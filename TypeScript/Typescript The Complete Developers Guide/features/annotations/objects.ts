const profile = {
    name: 'alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15
    },
    setAge(age: number): void {
        this.age = age
    }
}

const { age }: { age: number } = profile
const age2: number  = profile.age

// let { coords: { lat, lng } } = profile
let { coords: { lat, lng } }: { coords: { lat: number, lng: number } } = profile
