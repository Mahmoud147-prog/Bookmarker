var warning_div=document.getElementById("my_error_message");
var Name_input =document.getElementById("name_input");
var URL_input = document.getElementById("URL_input");
var submit_btn=document.getElementById("my_submit_btn");
var displayed_table=document.getElementById("displayed_table");

var sites_arr;
sites_arr=JSON.parse(localStorage.getItem("list"));




var fixed_box=`<thead>
   <tr >
       <th class="py-3" >Index</th>
       <th>Website Name</th>
       <th>Visit</th>
       <th>Delete</th>
   </tr>
</thead>`;
displayed_table.innerHTML=fixed_box;
if(sites_arr!=null){display();};
submit_btn.onclick=function(){
    if(validate(Name_input)&&validate(URL_input)){
        add();
        display();
        Store();
    }
    else {
         warning_div.classList.remove("d-none");
    }
    clear();

}
function add(){
    
    var printed_name=Name_input.value.charAt(0).toUpperCase()+Name_input.value.slice(1);
    var site_obj={
        N_input:printed_name,
        U_input:URL_input.value,
    }
    
    if(sites_arr==null){
        sites_arr=[];
        sites_arr.push(site_obj);
    }
    else sites_arr.push(site_obj);
    
    
}
function display(){
  
var box=``;
if(sites_arr!=null){
    for(var i=0;i<sites_arr.length;i++){
        box+=`<tr class="border-top border-bottom">
        <td>${i+1}</td>
        <td>${sites_arr[i].N_input}</td>
        <td class="text-center d-flex justify-content-center align-items-center "><a href="${sites_arr[i].U_input}"><button class="border-0 btn d-flex btn-warning">
        <i class="fa-solid fa-eye me-3"></i>
        <p>Visit</p>
    </button></a></td>
        <td class="text-center ">
            <div class="d-flex justify-content-center align-items-center"><button class="border-0 btn d-flex btn-danger" onclick=delete_func(${i})>
                <i class="fa-solid fa-trash-can me-3"></i>
                <p>delete</p></div>
        </button></td>
    </tr>`
    }
}
displayed_table.innerHTML=fixed_box+box;

}
function Store(){
    localStorage.setItem('list', JSON.stringify(sites_arr));
}
function clear(){
    Name_input.value="";
    URL_input.value="";
}
function close_func(){
    warning_div.classList.add("d-none");
}
Name_input.oninput=function(){
    validate(Name_input);
}
URL_input.oninput=function(){
    validate(URL_input);
}
function validate(ele){
var validation_obj={
    name_input:/^[a-z]{3,}$/,
    //URL_validation is copied and pasted form source files
    URL_input:/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,

}
if(validation_obj[ele.id].test(ele.value)){
   
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    return true
}
else {
    ele.classList.add("is-invalid");

    return false
}
}
function delete_func(index){
sites_arr.splice(index,1);
display();
localStorage.setItem("list",JSON.stringify(sites_arr));
}