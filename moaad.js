let title  = document.getElementById("title");
let price  = document.getElementById("price");
let taxes  = document.getElementById("taxes");
let ads  = document.getElementById("ads");
let discount  = document.getElementById("discount");
let total  = document.getElementById("total");
let count  = document.getElementById("count");
let category  = document.getElementById("category");
let supmit  = document.getElementById("supmit");
//console.log(title,price,taxes,ads,discount,total,count,category,submit);
showdata()

let mood = 'create';
let tmp;
//get total
function getTotal()
{

if(price.value != ""){

    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
    
}else{
    total.innerHTML = '';
    total.style.background = "red";

}
}






let datapro;

// التحقق مما إذا كان هناك بيانات مخزنة في localStorage
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = []; // إذا لم يكن هناك بيانات مخزنة، قم بإنشاء مصفوفة جديدة
}

submit.onclick = function() {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (mood === 'create') {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[  tmp  ] = newpro;
      mood = 'create';
      supmit.innerHTML = 'create';
      count.style.display = 'block';
    }

    

//save localstorage

    localStorage.setItem('product',  JSON.stringify(datapro)) // تحويل المصفوفة إلى سلسلة JSON وتخزينها في localStorage
    cleardata()
    showdata()
};



//clear inputs

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
  }
 

  function showdata() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        // تحقق من أن العنصر غير null وله خاصية title
        if (datapro[i] && datapro[i].title) {
            table += `
                <tr>
                    <td>${i}msung</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
            `;
        } else {
            console.error(`Invalid data at index ${i}`, datapro[i]);
        }
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">delete All (${datapro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}



  
  function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
  }
  showdata();

function updateData(i){
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
   getTotal()
   count.style.display = 'none';
  category.value = datapro[i].category;
  submit.innerHTML = 'update';
  mood = 'update';
  tmp = i;
  showdata();
  scroll({
    top:0,
    behavior:'smooth',
  })

}
showdata();


