
window.$ = window.jQuery = function ( selectorOrArray ) {
    let elements
    if(typeof selectorOrArray === 'string' ){
        elements = document.querySelectorAll ( selectorOrArray )
    }else if ( selectorOrArray instanceof  Array){
        elements = selectorOrArray
    }
    return {
        addClass: function ( className ) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                elements[i].classList.add ( className )
            } return this
        },
        oldApi: selectorOrArray.oldApi,
        find(selector) {
            let array = []
            for ( let i = 0; i<elements.length;i++ ){
                const  element2 = Array.from(elements[i].querySelectorAll(selector))
                array =array.concat(element2)
            }
            console.log(this)
            array.oldApi = this

            const newApi = jQuery ( array )
              return  newApi
        },
        end(){
            console.log(this)
            return this.oldApi
        }, each(fn){
            for(let i = 0 ;i < elements.length;i++){
                fn.call(null,elements[i],i)
            }
                return this
        },parent() {
            const array = []
            this.each ( ( node ) => {
                array.push ( node.parentNode )  //推到数组里面
            } )
            return jQuery ( array )
        },
        print() {
        console.log(elements)
    },children(){
            const array = []
            this.each((node)=>{
                array.push(...node.children)
            })
            return jQuery(array) }



} }


