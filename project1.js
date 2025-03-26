let btn = document.querySelector('button')
let select = document.getElementById('select')
btn.addEventListener('click',function(e){
    e.preventDefault()
    select.remove(select.selectIndex)
    console.log(select.selectIndex);
    
})