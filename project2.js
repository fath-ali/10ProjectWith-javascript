

    let btn = document.querySelector('button')
    btn.addEventListener('click',function(){
           // Prompting the user to input the number of rows
    rn = window.prompt("Input number of rows", 1);
    // Prompting the user to input the number of columns
    cn = window.prompt("Input number of columns",1);
  
    // Looping through rows
    for(var r=0;r<parseInt(rn,10);r++)
    {
        // Inserting a new row at index r in the table
        var x=document.getElementById('mytable').insertRow(r);
        // Looping through columns
        for(var c=0;c<parseInt(cn,10);c++)  
        {
            // Inserting a new cell at index c in the current row
            var y=  x.insertCell(c);
            // Setting the inner HTML content of the cell
            y.innerHTML="Row-"+r+" Column-"+c; 
        }
    }
    })

