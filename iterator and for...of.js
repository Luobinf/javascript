
//1.iterator 迭代器是一种接口，它为各种不同的数据结构提供了一种统一的访问机制。任何数据结构，只要部署了Iterator接口，就可以完成
//遍历操作（即依次处理数据结构的所有成员）。
//为了让一个对象可迭代，我们必须给这个对象部署Symbol.iterator方法，这是一个特殊的内置标记。且该方法必须返回一个迭代器，包含next
//方法。next方法返回的结果格式必须是{value:any,done:Boolean}。value表示返回的值，done表示迭代是否完成。true表示迭代完成


function makeIterator(arr) {
    let nextIndex = 0
    return {
        next () {
            if (nextIndex < arr.length) {
                return {value: arr[nextIndex++], done: false}
            } else {
                return {value: undefined, done: true}
            }
        }
    }
}

let it = makeIterator([1,2,3])
console.log(it.next()) //{value: 1,done: false}
console.log(it.next()) //{ value: 2, done: false }
console.log(it.next()) //{ value: 3, done: false }
console.log(it.next()) //{ value: undefined, done: true }

//2.对于迭代器对象来说，done:false和value:undefined属性是可以省略的。因此上面的函数可以写成下面这种形式。
function makeIterator2 (arr) {
    let nextIndex = 0
    return {
        next () {
            if (nextIndex < arr.length) {
                return {value: arr[nextIndex++]}
            } else {
                return {done: true}
            }
        }
    }
}

let itTwo = makeIterator2([10,20,30])
itTwo.next() //{value: 10}
itTwo.next() //{value: 20}
itTwo.next() //{value: 30}

//3.数据结构的默认iterator接口
//iterator接口的目的，就是为所有数据结构提供一种统一的访问机制，即for...of循环可以进行遍历。当使用for...of循环去遍历某种
//数据结构时，该循环会自动去寻找iterator接口。
//es6规定，默认的iterator接口部署在数据结构的Symbol.iterator属性上。调用该方法，就会返回一个遍历器对象。或者说，只要一个数据结构
//部署了Symbol.iterator属性，就认为是可迭代的。

let arr2 = ['a','b','c']
let iter = arr2[Symbol.iterator]()
console.log(iter) //这里将返回一个迭代器对象
console.log(iter.next()) //{ value: 'a', done: false }

//4.如果一个对象要被for...of循环遍历，那么在该对象上必须部署Symbol.iterator属性或者在原型上部署(该属性是一个方法)，该方法需要返回一个迭代器
//对象，且迭代器对象中包含next方法。使用for...of循环去遍历数据结构时，会自动调用该方法(Symbol.iterator)，使得返回迭代器对象，
//当for...of循环希望取得下一个值时，就会自动调用返回的那个迭代器对象中的next方法。也即keys()、values()、entries()方法都会返回
//一个迭代器对象，且该对象中会包含一个next方法。举个例子:
let arr3 = [10,20,30]
let iter2 = arr3.values()
console.log(iter2.next()) //{ value: 10, done: false }
console.log(iter2.next()) //{ value: 20, done: false }
console.log(iter2.next()) //{ value: 30, done: false }
console.log(iter2.next()) //{ value: undefined, done: true }


//5.下面用一个类部署Iterator接口
class Iterator {
    constructor (start,stop) {
        this.start = start
        this.stop = stop
    }
    [Symbol.iterator] () {
        return this
    }
    next () {
        if (this.start < this.stop) {
            return {value: this.start++,done: false}
        } else {
            return {value: undefined,done: true}
        }
    }
}
let iter3 = new Iterator(0,3)
console.log(iter3)  //Iterator { start: 0, stop: 3 } 这里返回一个迭代器对象
for(let value of iter3){
    console.log(value)  //0 1 2
}

//6.下面是一个为对象添加iterator接口的例子

let obj = {
    data: ['jack','age'],
    [Symbol.iterator] () {
       return this
    },
    index: 0,
    next () {
        if (this.index < this.data.length) {
            return {value: this.data[this.index++], done: false}
        } else {
            return {value: undefined, done: true}
        }
    }
}
for(let j of obj) {
    console.log(j) //'jack' 'age'
}

//7.对于类似数组的对象(存在数值键名和length属性)，部署iterator接口的一个简单方法是Symbol.iterator方法直接引用数组的Iterator
//接口 例如：
let obj2 = {
    0: 'a',
    1 : 'age',
    2: 'name',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let value of obj2) {
    console.log(value)  //'a' 'age' 'name'
}

//特别提醒：普通对象部署数组的Symbol.iterator方法并无效果。

//8.调用Iterator接口的场合
//扩展运算符 解构赋值 for...of循环 Set Map等等

function fn() {
    for(let j in arguments) {
        console.log(j) //0 1 2 3
    }
    for(let j of arguments) {
        console.log(j)  //10 30 60 90
    }
}
fn(10,30,60,90)

//9.对于普通的对象，for...of循环不能使用，会报错。在这种情况下，可以用for...in循环遍历键名
let obj3 = {
    name: 'john',
    age: 23,
    address: 'zhejiang'
}
for(let j in obj3) {
    console.log(j)  //name age address
}
// for(let j of obj3){
//     console.log(j)  //报错 TypeError: obj3 is not iterable
// }

//可以使用Object.keys()方法先将对象的键转化成数组，再用for...of循环遍历

for(let key of Object.keys(obj3)){
    console.log(obj3[key]) //john 23 zhejiang
}
