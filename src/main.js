const $siteList = $('.siteList')
const $siteLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {name : '前端图标', url: 'https://www.iconfont.cn'},
    {name : 'Github', url: 'https://github.com'},
    {name : 'Figma页面布局', url: 'https://www.figma.com/'},
    {name : '阮一峰JS教程', url: 'http://www.ruanyifeng.com/blog/2016/11/javascript.html'},
    {name : 'Vue.js', url: 'https://cn.vuejs.org/index.html'},
    {name : 'React', url: 'https://zh-hans.reactjs.org/'},
    {name : 'jQuery', url: 'https://www.jquery123.com'},
    {name : '写代码啦', url: 'https://xiedaimala.com'},
    {name : '语雀博客', url: 'https://www.yuque.com/'},
]
document.body.addEventListener('touchstart', function () {}); //ios端监听屏幕触摸事件
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
            const $li = $(`
            <li class="list">
                <div class="labelButton">
                    <div class="name">${node.name}</div>
                    <div class="url">${simplifyUrl(node.url)}</div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-more"></use>
                    </svg>
                </div>
            </li>
            `).insertBefore($siteLi[0])
            $li.on('click', ()=>{
                window.open(node.url)
            })

            //监听Mobile长按事件和点击事件
            let longClick = 0;
            let timeOutEvent = 0;
            $li.on({
                touchstart: (e)=>{
                    longClick=0;//设置初始为0
                    timeOutEvent = setTimeout(()=>{
                        $('.popWrapper').css('display', 'block')
                        longClick=1;//假如长按，则设置为1
                    },500);
                    $('div.popTitle')[0].innerText='修改快捷标签'
                    $('button.labelFinish')[0].innerText='修改'
                    $('.popNameInput')[0].value = node.name
                    $('.popUrlInput')[0].value = node.url
                    let index = hashMap.indexOf(node);
                    $('.labelFinish').on('click', () => {
                        let newUrl = $('#popUrlInput').val()
                        let newName = $('#popNameInput').val()
                        if(!newName){
                            hashMap[index].name=simplifyUrl(newUrl)[0].toUpperCase(),
                            hashMap[index].url=newUrl
                            console.log(name)
                        }else{
                            hashMap[index].name=newName,
                            hashMap[index].url=newUrl
                        }
                    })
                    $('.labelRemove').on('click', () => {
                        hashMap.splice(index, 1)
                        render()
                    })
                },
                touchmove: (e)=>{
                    clearTimeout(timeOutEvent);
                    timeOutEvent = 0;
                    e.preventDefault()
                },
                touchend: (e)=>{
                    clearTimeout(timeOutEvent);
                    if(timeOutEvent !== 0 && longClick === 0){
                        window.open(node.url)
                    }
                    return false;
                }
            });
            $li.on('click', '.icon', (e) => {
                e.stopPropagation() // 阻止冒泡
                $('.popWrapper').css('display', 'block')
                $('div.popTitle')[0].innerText='修改快捷标签'
                $('button.labelFinish')[0].innerText='修改'
                $('.popNameInput')[0].value = node.name
                $('.popUrlInput')[0].value = node.url
                let index = hashMap.indexOf(node)
                $('.labelFinish').on('click', () => {
                    let newUrl = $('#popUrlInput').val()
                    let newName = $('#popNameInput').val()
                    if(!newName){
                        hashMap[index].name=simplifyUrl(newUrl)[0].toUpperCase(),
                        hashMap[index].url=newUrl

                    }else{
                        hashMap[index].name=newName,
                        hashMap[index].url=newUrl
                    }
                })
                $('.labelRemove').on('click', () => {
                    hashMap.splice(index, 1)
                    render()
                })
            })
        }
    )
}

render()

// 弹出框事件设置
$('.siteList > .last').on({
    click: () => {
        $('.popWrapper').css('display', 'block')
        $('div.popTitle')[0].innerText = '添加快捷标签'
        $('button.labelFinish')[0].innerText = '添加'
    },
    touchstart: () => {
        $('.popWrapper').css('display', 'block')
        $('div.popTitle')[0].innerText = '添加快捷标签'
        $('button.labelFinish')[0].innerText = '添加'
    }
})
$('.labelFinish').on('click', () => {
    if($('button.labelFinish')[0].innerText==='添加'){
        let url = $('#popUrlInput').val()
        let name = $('#popNameInput').val()
        if(url){
            if (url.indexOf('http') !== 0) {
                url = 'https://' + url
            }
            if(!name){
                hashMap.push({
                    name: simplifyUrl(url)[0].toUpperCase(),
                    url: url
                })
                console.log(name)
            }else{
                hashMap.push({
                    name: name,
                    url: url
                })
            }
            render()
        }
    }
})

$('.labelCancel').on('click', () => {
    $('.popWrapper').css('display', 'none')
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

