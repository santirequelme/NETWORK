
like= document.querySelectorAll(".liked");
edit = document.querySelectorAll(".edit");
text_area =  document.querySelectorAll(".textarea");

like.forEach((element) =>{
    like_toggler(element);
});

edit.forEach((element)=> {
    element.addEventListener("click", ()=> {
        edit_handler(element);
    });
});

text_area.forEach((element) => {
    element.addEventListener("keyup", (e) => {
        if (e.keyCode == 13 && e.shiftkey) return;
        if (e.keyCode === 13) edit_handler(element);
     });
});

function edit_post(id, post) {
    form= new FormData();
    form.append("id", id);
    form.append("post", post.trim());

    fetch("/edit_post/", {
        method: "POST",
        body: form,
    }).then(()=>{
        document.querySelector(`#post-content-${id}`).textContent = post;
        document.querySelector(`#post-content-${id}`).style.display="block";
        document.querySelector(`#post-edit-${id}`).style.display = "none";
        document.querySelector(`#post-edit-${id}`).value = post.trim();
    });
}

function edit_handler(element){
    id=element.getAttribute("data-id");
    edit_btn= document.querySelector(`#edit-btn-${id}`);
    if (edit_btn.textContent == "Edit"){
        document.querySelector (`#post-content-${id}`).style.display = "none";
        document.querySelector (`#post-edit-${id}`).style.display = "block";
        edit_btn.textContent= "Save";
        edit_btn.setAttribute("class", "userco edit");
    }
    else if (edit_btn.textContent == "Save"){
    edit_post(id, document.querySelector(`#post-edit-${id}`).value);
    edit_btn.textContent = "Edit";
    edit_btn.setAttribute("class", "text-danger edit");
    }
}

function like_toggler(element) {
  element.addEventListener("click", () => {
    id = element.getAttribute("data-id");
    liked_t = element.getAttribute("data-liked_t");
    icon = document.querySelector(`#post-like-${id}`);
    count = document.querySelector(`#post-count-${id}`);

    form = new FormData();
    form.append("id", id);
    form.append("liked_t", liked_t);
    fetch("/like/", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 201) {
          if (res.liked_t === "yes") {
            icon.src = "https://image.flaticon.com/icons/svg/3237/3237429.svg";
            element.setAttribute("data-liked_t", "yes");
          } else {
            icon.src ="https://image.flaticon.com/icons/svg/3237/3237404.svg";
            element.setAttribute("data-liked_t", "no");
          }
          count.textContent = res.like_count;
        }
      });
  });
}

texto = document.querySelector("#add-text");
btn = document.querySelector("#add-btn");
root = document.querySelector("#root");

btn.addEventListener("click",()=> {
    text = texto.value;

    if (text.length != 0){
        form = new FormData();
        form.append("post", text.trim());
        fetch("/add_post/", {
            method:"POST",
            body:form,
        })
          .then((res)=> res.json())
          .then((res)=> {
              if ( res.status == 201){
                  html_create(
                      res.post_id,
                      res.username,
                      text.trim(),
                      res.timestamp,
                      `/user/${res.username}`
                  );
                  texto.value ="";
              }
          });
    }
    location.reload(true);
});

function div_crea(className) {
    div= document.createElement("div");
    div.setAttribute ("class", className);
    return div;
}

function html_create (id, username, post, time, link){
    div1= div_crea("card bg-dark my-2");

    div2= div_crea("card-body cardStyle");

    div3= div_crea("d-flex mb-2");

    div4 = div_crea("d-flex justify-content-start");
    
    a1= document.createElement("a");
    a1.setAttribute("href", link);

    span1= document.createElement("span");
    span1.setAttribute("class", "text-secondary");
    span1.textContent = username;

    div5 = div_crea("w-100 d-flex justify-content-end");

    span2= document.createElement("span");
    span2.setAttribute("class", "mx-2 text-secondary");
    span2.textContent = time;

    span3 = document.createElement("span");
    span3.setAttribute("class", "text-primary edit");
    span3.textContent = "Edit";
    span3.setAttribute("data-id", id);
    span3.setAttribute("id", `edit-btn-${id}`);
    span3.addEventListener("click", () => { edit_handler(span3)});

    span4= document.createElement("span");
    span4.setAttribute("class", "post");
    span4.setAttribute("id", `post-edit${id}`)
    span4.textContent= post; 
    
    textarea= document.createEelemen("textarea");
    textarea.setAttribute("class", "form-control textarea");
    textarea.setAttribute("id", `post-edit-${id}`);
    textarea.setAttribute("style", "display:none;");
    texarea.textContent= post;
    textarea.addEventListener("keyup", (e) => {
        if (e.keyCode == 13 && e.shiftkey) return;
        if (e.keyCode === 13) edit_handler(textarea);
    });

    div6= div_crea ("like mt-3")
    img= document.createElement("img");
    img.setAttribute("class", "liked");
    img.setAttribute("data-id", id);
    img.setAttribute("id", `post-like-${id}`);
    img.setAttribute("data-liked_t", "no");
    img.setAttribute("src", "static/network/like.png");

    like_toggler(img);
    span5= document.createElement("span");
    span5.setAttribute("id", `post-count-${id}`);
    span5.textContent= "0";

    div6.appendChild(img);
    div6.appendChild(span5);

    div5.appendChild(span2);
    div5.appendChild(span3);

    a1.appendChild(span1);

    div4.appendChild(a1);
    
    div3.appendChild(div4);
    div3.appendChild(div5);
    
    div2.appendChild(div3); 
    div2.appendChild(span4);
    div2.appendChild(textarea); 
    div2.appendChild(div6);
    
    div1.appendChild(div2);
    
    root.appendChild(div1);
}










