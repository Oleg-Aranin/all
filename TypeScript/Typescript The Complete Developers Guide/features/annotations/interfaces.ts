interface Vehicle {
    name: string
    year: number
    broken: boolean
    summary(): string
}

const oldCivic = {
    name: 'civic',
    year: 2000,
    broken: true,
    summary(): string {
      return `Name: ${this.name}`
    }
}

const printVehicle = (vehicle: Vehicle): void => {
    console.log(vehicle.summary())
}

printVehicle(oldCivic)

//=====================================================================

interface Vehicle2 {
    summary(): string
}

const oldCivic2 = {
    name: 'civic',
    year: 2000,
    broken: true,
    summary(): string {
      return `Name: ${this.name}`
    }
}

const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40,
    summary(): string {
        return this.color
    }
}

const printVehicle2 = (vehicle: Vehicle2): void => {
    console.log(vehicle.summary())
}

printVehicle2(oldCivic)
printVehicle2(drink)
