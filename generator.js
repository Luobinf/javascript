
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
