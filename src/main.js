
// 记住因为后面在jquery里我们干掉了api ,直接return那个函数,下面声明了api,相当于把api从前面传到了后面, 相当于给那个函数命名
// const api = jQuery ( '.test' ) // 不返回元素,返回api对象
// 因为把api从前面传到了后面,后面的函数就是this,他就直接调用那个api为他的名字
// 所以api可以进行链式操作,还有是调用后才确定this是api的,`.addClass`前面是什么调用,就是前面就传什么
// =>api.addClass ( 'blue' ).addClass('red').addClass('yellow')
// 链式操作
// 用 api 调用函数 addClass ,而 addClass 又返回了一个api ,所以后面可以在加一个. addClass('red')
// 这时相当于 api.addClass = api 后面加上. addClass('red')
// 相当于api.addClass('red')
// 这就是 链式操作 ,这样做 就是因为前面仅仅return api

//1. 第一个核心就是闭包
//2. 第二个核心是链式操作


//前面的公理,用函数来调用一个对象,那么函数的this就是前面的那个对象
//obj.fn(p1)  // 同理  这个函数的里的this就是 obj
//onj.fn.call(obj,p1)

// *****%%%%%%代码的在最终版本,声明都可以不要了%%%%%%
//jQuery ( '.test' ).addClass('blue').addClass('red').addClass('yellow' )
//声明都可以不要了,直接jQuery得到元素放进this里面,直接在后面传递addClass调用this,相当于
//jQuery ( '.test' ).addClass('blue') = tish
// 相当于tish.addClass('red') =this
// 相当于this.addClass('yellow' )



// jQuery对象   =>>>>>>>>>    代指jQuery函数构造出来的对象
//jQuery对象 =>>>>>>  不是说「jQuery这个对象」,是 说 指jQuery函数构造出来的对象
// jQuery 是 一个  ******>>>>>>函数  记住

//举例
// Object是个函数
// Object对象表示Object构造出的对象
// Array是个函数
// Array对象/数组对象表示Array构造出来的对象
// Function是个函数
// Function对象/函数对象表示Function构造出来的对象
//所有首字母大写的 都代表了 他 构造出来了 一个 对象 ,记住: 首字母大写


//--------------------------------------------------

// const x1 =  jQuery ( '.test' ).find('.child')
// console.log(x1)
// x1.addclass('red')  这一步是报错的,因为前面返回的就变成了一个纯数组了

// jQuery ( '.test' )
//     .find('.child')
//     .addClass('red')
//     .addClass('yellow')
//--------------------------------------------------
// jQuery ( '.test' )       // 假设这个为api1
//     .find('.child')  //假设这个为api2
//     .addClass('red') //这句话就在api2中执行
//     .addClass('yellow') ////这句话就在api2中执行
//     .end()   // 通过这个 再次回到api1,就是'.test' 上操作
//     .addClass('green')  // green 就在api1上 ,test 上面加一个green
// const api1 =jQuery ( '.test' )  // 旧的 api1
// const api2 = api1.find('.child').addClass('red')
// const oldApi = api2.end().addClass('green')  // 调用end的只能是api2,是新的api

// jQuery ( '.test' )
//     .find('.child')
//     .addClass('red')
//     .addClass('yellow')
//     .end()
//     .addClass('green')

// const  x =  jQuery('.test').find('.child')
// x.each((div)=>console.log(div))  // x 就是jQuery('.test').find('.child') 传回的 对象

// const  x =  jQuery('.test')
// x.children().print()


//  细节 :笔记-----------------------------
//const div1 = document.querySelector('.test')
// const div2 =$('.test')
// div2到底是DOM对象,还是jQuery对象?????
// DOM对象只能使用DOM API    =>    querySelector  , appendChild
// jQuery对象只能使用jQuery的API   =>    find ,each

//  const elDiv1 = document.querySelector('.test')    前面加**el    ** 表示DOM  api
// const $div2 = $('.test')     前面加**$   ** 表示jQuery   api

//我代码中所有$开头的变量都是jQuery对象 =>   这是约定,除非特殊说明

let a = $('body')
console.log(a)