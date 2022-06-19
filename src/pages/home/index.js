import DemoImg from '../../assets/imgs/demo.jpeg'

const printHello = function(){
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src=DemoImg
    div.appendChild(img)
    document.querySelector('#app').append(div)
    console.log('打印完成')
}

export default printHello