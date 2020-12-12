//jQuery接受一个选择器,得到一些元素;然后返回一个对象,这个对象可以操作*刚才的得到的元素*
// 两个等于号在议会,是从右向左进行的
window.$ = window.jQuery = function ( selectorOrArray ) {  // 刚才jQuery使用数组构建了一个newApi,所以这里要让jQuery可以接受数组 ,selectorOrArrayOrTemplate
    let elements  //  一定要放在外面声明,若是放在里面声明作用域会被限制的
    if(typeof selectorOrArray === 'string' ){   // 这个就用来 重载的 方式了
        elements = document.querySelectorAll ( selectorOrArray ) //selectorOrArray 等于字符串,就使用document
    }else if ( selectorOrArray instanceof  Array){ // 对象最好用instanceof来判断
        elements = selectorOrArray   // selectorOrArray若是数组就直接赋值给elements,用他来构造刚才那个newApi  // 用来做构造这一句的jQuery(array)  // 这个思路是如果你发现需要改变对象,就在用jQuery构造,进行不同情况的赋值,再次return
    }

    // api可以操作elements //这是一个对象
    //   这一步被废弃了,转变为直接 return {addClass: function(){}  } =>这个函数 被废弃了 *const api* = {

    //addClass:function(className){......} 这个是有简写的
    // 相当于
    return {
        addClass: function ( className ) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                elements[i].classList.add ( className )
            }  // 遍历elements,加上一个名字className
               //并且,这个就是一个闭包,因为函数可以访问外部的变量,这个变量是elements
            // => return api //正是因为遍历完了,就返回出api,这一步导致了我们可以*链式操作* //这个return是函数addClass的 ,要区分清楚
            return this
            // 这个函数就是 调用 对象,这个 this 就是 api ,api可以用this来调用 ,相等于 return api

        } , //  这一步被废弃了,转变为直接 return {addClass: function(){} }这个函数 ,直接就return了,干掉了 api
        //return api  // 这个return出api一定要写,刚才就是,没有写,导致关联不上 //并且这个return是外面的函数jQuery的
        oldApi: selectorOrArray.oldApi,
        find( selector ) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const element2 = Array.from ( elements[i].querySelectorAll ( selector ) )
                array = array.concat ( element2 )
            }
            const newApi = jQuery ( array )  // jQuery ( array )会在调用一次jQuery的
            // 在用jQuery创造一个新的newApi ,返回这个newApi
            array.oldApi = this // this 是旧 api 1
            //elements = array
            return newApi
            //  思路:  首先  document.querySelectorAll('.test')  得出一个 伪数组elements  ,是所有含有class=test的数组
            //   热后  遍历  elements[i].querySelectorAll('.child')  得出在所有含有class=test数组中  所有的字节点含有 class=  child 的数组
            // 再把含有所有子节点class=  child 的数组 ,从伪数组 转换成真正的 数组(Array.from)来转
            //  再把真正的数组和array连接起来
            //  但是   return  array  出来的 就 是 一个 彻彻底底的数组
            // 想想,array已经使用一个数组了, addClass使用就会报错,那么我们 return this 可以吗?
            // 答:不可以的, const x1 =  jQuery ( '.test' ).find('.child')  ,这个this 只会连接到前面的,他就 代表 了jQuery ( '.test' )  ,不能代表find
            // 若是 return  array    前面加  elements = array  , 这样this  就挂在jQuery ( '.test' ) 就没有问题了  ,但是有 bug
            // const api1 = jQuery('.test')
            // api1.addClass('blue')
            // const api2 = api1.find('.child').addClass('red')
            // api1.addClass('green') => green会添加到test上面,因为我们用的是同一个elements,下面操作会影响他,会影响之前所有的保留的对象的引用
        },end(){
            return this.oldApi  // 这个时候this变成了新 api2,这时api2的前面一个api就是api1
        },each(fn){
            for(let i = 0 ;i < elements.length;i++){
                fn.call(null,elements[i],i)  //const  x =  jQuery('.test').find('.child')
                                            // x.each((div)=>console.log(div))
                                            // fn就是(div)=>console.log(div), 同时elements[i] 传到div ,因为是fn调用的 ,所以console.log(elements[i]) 得出这个
            } return this                   // 这个this就当前的api , 就是这个包含了一堆的东西 return {....} 一堆的对象,里面包含的数组
        },parent() {
            const array = []
            // 就是api的对象,进行each的循环,输入节点,输出节点的父亲
            this.each ( ( node ) => {
                if (array.indexOf(node.parentNode === -1) ){
                    // 判断父亲子节点对他的父亲响应了几次,小于-1,就进行push
                    array.push ( node.parentNode )  //推到数组里面
                }
            } )
            return jQuery ( array )  // 不要return,array因为array没有可操作性,我们要用jQuery把array封装起来,这样便于操作
        } , print() {
          console.log(elements)  //elements就是对应的各种元素
            // 还有在打印中test是有三个的,每一次都会对同一个父亲进行打印,会打出三个父亲,所以要在前面进行一个判断,在parent()判断,push一次就可以了
        },children(){
            const array = []
            this.each((node)=>{
                array.push(...node.children) // ...意思是把数组展开 相等于   array.push(node.children[0],node.children[1],node.children[2].....node.children[10]) 这样的把数组展开
            })
            return jQuery(array)
        }


    }
}

// 我们 声明 函数function,然后这个函数会获取到elements  ,然后返回一个对象APi ,然后这个对象APi操作这个elements



