class Vehicle {

    constructor(public color: string) {
    }

    protected honk(): void {
        console.log('beep')
    }
}

const vehicle = new Vehicle('orange')

class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        super(color)
    }

    private drive(): void {
        console.log('реисайн метод')
    }

    startDrivingProcess(): void {
        this.drive()
        this.honk()
    }
}


const car = new Car(4,'red')
car.startDrivingProcess()


//=================================================================================
// class Vehicle {
//     // public drive(): void {
//     //      console.log('hfhffh')
//     //  }
//
//     protected honk(): void {
//         console.log('beep')
//     }
// }
//
// class Car extends Vehicle {
//     private drive(): void {
//         console.log('реисайн метод')
//     }
//
//     startDrivingProcess(): void {
//         this.drive()
//         this.honk()
//     }
// }
//
// const vehicle = new Vehicle()
// // vehicle.drive()
// // vehicle.honk()
//
// const car = new Car()
// // car.honk()
// car.startDrivingProcess()

//=========================================================================
// class Vehicle {
//     drive(): void {
//         console.log('hfhffh')
//     }
//
//     honk(): void {
//         console.log('beep')
//     }
// }
//
// class Car extends Vehicle {
//     drive(): void {
//         console.log('реисайн метод')
//     }
// }
//
// const vehicle = new Vehicle()
// vehicle.drive()
// vehicle.honk()
//
// const car = new Car()
// car.honk()
// car.drive()
