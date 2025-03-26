let input = document.getElementById('hieght')
let btn = document.querySelector('button')
let heading = document.getElementById('demo')
let bill = 0;
btn.addEventListener('click', function () {
    let inputvalue = input.value.trim()
    if (inputvalue >= 120) {
        heading.innerHTML = "Welcom to the rollercoaster"
        let createDive = document.createElement('div');
        createDive.style.cssText = "width:100%;height:30px;";
        let createinput = document.createElement('input');
        createinput.placeholder = "Enter Your age";
        createinput.type = 'number';
        createinput.id = "age";
        createinput.style.cssText = "    outline: none; border: none; border: 1px solid #aaa;padding: 10px;border-radius: 10px;margin-top:10px"
        document.querySelector('.container').appendChild(createDive)
        createDive.appendChild(createinput)
        let age = document.getElementById('age');
        btn.addEventListener('click', function () {
            let agevalue = age.value.trim()
            if (agevalue < 12) {
                let para = document.createElement('p');
                para.id = 'demo';
                para.innerHTML = "please welcome to the site"
                createDive.appendChild(para)
                bill = 5

            } else if (agevalue > 12 && agevalue < 18) {
                let para = document.createElement('p');
                para.id = 'demo';
                para.innerHTML = "please welcome to the site"
                createDive.appendChild(para)
                bill = 7
            }
            else if (agevalue > 19) {
                let para = document.createElement('p');
                para.id = 'demo';
                para.innerHTML = "please welcome to the site"
                createDive.appendChild(para)
                bill = 12
            }
        })
        let createimagedive = document.createElement('div');
        let createfiles = document.createElement('input');
        createfiles.type = 'file';
        createfiles.hidden
        createfiles.id = 'files1';
        createimagedive.style.cssText = `outline: none; border: none; border: 1px solid #aaa;padding: 10px;border-radius: 10px;height:200px;
        margin-top:20px`
        createDive.appendChild(createimagedive)
        createimagedive.appendChild(createfiles);
      let createfile1 = document.getElementById('files1')
      createfile1.addEventListener('click',function(){
        if(createfile1 ==' '){
            let para = document.createElement('p');
                para.id = 'demo';
                para.innerHTML = "oke"
                createDive.appendChild(para)
        }
        else if(createfile1 ===createfile1.value){
            let para = document.createElement('p');
                para.id = 'demo';
                para.innerHTML = "oke"
                createDive.appendChild(para) 
                bill = bill + 3;  
                console.log(bill);
                
        }
        
        
        
      })
      

    }
})
