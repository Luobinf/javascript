
//1.generator函数是ES6提供的一种异步编程解决方案。执行generator函数会返回一个迭代器对象。返回的迭代器对象，
//可以依次遍历generator函数的内部状态。generator函数有两个特征:第一个是function与函数名之间有一个*号，二是函数体内部使用
//yield语句定义不同的状态。
function* generator() {
    yield 'hello'
    yield 'china'
    return 'hi'
}

//调用generator函数并不会立马执行，而是返回一个迭代器对象。需要调用迭代器对象的next方法，移动内部指针，才会去执行函数内部的
//状态，直到下一个yield语句或return语句为止。
let ge = generator()
console.log(ge.next()) //{value: "hello", done: false}
console.log(ge.next()) //{value: "china", done: false}
console.log(ge.next()) //{value: "hi", done: true}
//以上第三次调用next方法时，若不是return语句，那么value的值为undefined，且done为true，表示迭代结束。

//迭代器对象的next方法运行逻辑如下：
//一.遇到yield语句就暂停执行后面的操作，并将跟在yield语句后面的值作为返回对象的value属性值
//二.下一次调用next方法时继续向下执行，直到遇到下一条yield语句。
//三.如果没有再遇到新的yield语句，就一直运行到函数结束，直到遇到return语句为止，并将return语句后买你的值作为返回对象
//的value属性的值。
//四.若没有遇到return语句，那么返回对象的value属性值就为undefined，此后再调用next方法时，value属性值还是undefined。

//注意：generator函数里面只能执行一条return语句，但是可以执行多条yield语句，也就是可以返回一系列的值，或者说可以产生
//多种状态，因为可以有任意多条yield语句。

//2.yield语句不能用在普通函数里面，否则会报错。
// function fn() {
//     yield 1
// }
// fn()  //Uncaught SyntaxError: Unexpected number

//3.next方法可以带参数
//yield语句本身没有返回值，或者说yield语句的返回值为undefined。next方法可以带一个参数，该参数会被当做上一条yield语句的返回值。
//例如：
function* foo(x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    return (x + y + z)
}

let a = foo(5)  //这里返回一个迭代器对象
console.log(a.next())  //{value: 6, done: false}
console.log(a.next())  //{value: NaN, done: false}
console.log(a.next())  //{value: NaN, done: false}
//为什么上述结果为出现NaN呢？
//之前已经说过，value属性的值时yield语句后面表达式的值，当第一次调用next方法时，由于x为5，此时yield后面的值为6
//故返回对象的值为6。当第二次调用next方法时，返回y/3的值，由于此时next没有传入参数，那么上一次的yield语句就会返
//回undefiend，y = 2 * undefined,此时y就为NaN，NaN/3的结果还是NaN，故第二次返回对象的value属性值为NaN。当第
//三次调用next方法时，由于没有传入参数，那上一条yield语句的返回值就是undefined，此时z就为undefined，此时x + y + z
//的值为 5 + NaN + undefined即为NaN，故第三次调用next方法时，其返回对象的value属性值还是NaN。

function* fn(x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    return (x + y + z)
}
let b = foo(5)  //这里返回一个迭代器对象
console.log(b.next())  //{value: 6, done: false}
console.log(b.next(9))  //{value: 6, done: false}
console.log(b.next(10))  //{value: 33, done: true}
//上述结果分析如下：
//第一次调用next方法时，返回第一条yield语句后面表达式的值为6.第二次调用next时，由于传入了参数为9，那么该参数的值就为上一条
//yield语句的返回值，为9，所以有y = 2 * 9，y为18,那么第二条yield语句的值就为y/3=18/3=6，故第二次调用next方法时返回对象的
//value属性值为6.第三次调用next方法时传入参数为10，故上一次yield语句的返回值就为10，那么z就等于10，此时x + y + z表达式的
//值就为5 + 18 + 10等于33.

//4.Generator.prototype.throw()
function* f3() {
    yield 10
    throw new Error('我错了')
}

let fn3 = f3()
try{
    console.log(fn3.next())
    console.log(fn3.next())
} catch(e) {
    console.log('捕获错误', e)
}

//4.Generator.prototype.return()

