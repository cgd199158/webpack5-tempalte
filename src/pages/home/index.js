import DemoImg from '../../assets/imgs/demo.jpeg'


const printHello = function(){
    // const a = _.add(6,4)
    // console.log(">>>>>>>>>>>>>>>>>", a)
    // const b = a + 10
    // alert(b)
    const div = document.createElement('div')
    div.innerHTML = '2222222123123123'
    const img = document.createElement('img')
    img.src=DemoImg
    div.appendChild(img)
    document.querySelector('#app')?.append(div)
    console.log('ces ')
    const a = {a: 1, b: 2}
    const b = cloneDeep(a)
    console.log('b', b)
}

export default printHello