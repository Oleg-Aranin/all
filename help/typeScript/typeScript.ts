// ====================енумы ====================

enum Membership {
    Simple,
    Standart,
    Premium
}

const memdership = Membership.Standart
const memdershipReverse = Membership[2]

// =========================функции ======================
function add(a: number, b: number): number {
    return a + b
}

interface myPosition {
    x: number | undefined
    y: number | undefined

}
interface myPositionWithDefault extends myPosition {
    default: string
}
function position(): myPosition 
function position(a: number): myPositionWithDefault
function position(a: number, b: number): myPosition

function position(a?: number, b?: number): myPosition {
    if (!a && !b) {
        return {x: undefined, y: undefined}
    }
    if (a && !b) {
        return {x: a, b: undefined, default: a.toString()    }
    }

    return {x: a, y: b}
}

//=================================== классы =========================
class Typescript {
    version: string

    constructor(version: string) {
        this.version = version
    }
    info(name: string) {
        return `[${name}]: Typescript version is ${this.version}`
    }
}

class Car {
    readonly model: string
    readonly numberWheels: number = 4

    constructor(theModel: string) {
        this.model = theModel
    }
}

class Car2 {
    readonly numberWheels: number = 4
    constructor(readonly model: string){}
    }
//=============================== модификаторы ================
class Animal {
    protected voice: string = ''
    public color: string = 'black'

    private go() {
        console.log('go')
    }
}

class Cat extends Animal {
    public setVoice(voice: super): void {
        this.voice = voice
}
}

const cat = new Cat()

//============================= обстрактные классы ==========

abstract class Component {
    abstract render(): void
    abstract info(): string
}
class AppComponent extends Component {
    render(): void {
        console.log()
    }
    info(): string {
        return "this is info";
    }
}

//===================== гварды =============
function strip(x: string | number) {
    if (typeof x === 'number') {
        return x.toFixed(2)
    }
    return x.trim()
}

// ============================= дженерик =========
const arrayNabers: Array<number> = [1, 2, 3]
const arrayStrings: Array<string> = ['1, 2, 3', 'gfgg', 'gfder']

function revers<T>(array: T[]): T[] {
    return array.reverse()
}

revers(arrayNabers)
revers(arrayStrings)

//========================= операторы===============
interface Person {
    name: string
    age: number
}
type PersonKeys = keyof Person // 'name' | 'age'

let key: Person = 'name'
key = 'age'

type User = {
    _id: number
    name: string
    email: string
    createDate: Date
}

type UserKeyNoMeta = Exclude<keyof User, '_id' | 'createDate'> // 'name' | 'email'
type UserKeyNoMeta2 = Pick<User, 'name' | 'email'> // 'name' | 'email'