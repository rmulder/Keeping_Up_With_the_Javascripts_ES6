window.addEventListener("load", landingPage);

const divContainer = document.getElementById("container");

let usersList = [];
var passwordGlobal = "";

function localStorageUsersList(uList){
    localStorage.setItem('localUsersList',JSON.stringify(uList));
    chkAgree.checked = false;
    swal({
        title: "successfully stored!",
        icon: "success",
    });
    
    divContainer.removeChild(myForm);
    dashBoard();
}

function localStorageUsersList2(uList){
    localStorage.setItem('localUsersList',JSON.stringify(uList));
    swal({
        title: "successfully modified!",
        icon: "success",
    });
}

function checkingEmail(e){

    var storedList = localStorage.getItem('localUsersList');
    
    if(storedList === null){
        usersList = [];
    }else{
        usersList = JSON.parse(storedList);
    }

    let index = usersList.findIndex(user => user.email === e);

    return index;

}

function landingPage(){

    btnSignUp = document.createElement("button");
    btnSignUp.innerHTML = "Sign Up";
    btnSignUp.id = "btnSignUp";
    btnSignUp.type = "button";
    
    btnLogIn = document.createElement("button");
    btnLogIn.innerHTML = "Log In";
    btnLogIn.id = "btnLogIn";
    btnLogIn.type = "button";
    
    divContainer.appendChild(btnSignUp);
    divContainer.appendChild(btnLogIn);

    btnSignUp.addEventListener("click", signUp);
    btnLogIn.addEventListener("click", logIn);

}//END LandingPage()

function signUp(){
    
    divContainer.removeChild(btnSignUp);
    divContainer.removeChild(btnLogIn);

    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");
    const br4 = document.createElement("br");

    let myForm = document.createElement("form");
    myForm.id = "myForm";

    let txtFirstName = document.createElement("input");
    txtFirstName.setAttribute("type", "text");
    txtFirstName.placeholder = "First Name";
    txtFirstName.style.display = "block";
    txtFirstName.id = "txtFirstName";
    myForm.appendChild(txtFirstName);
    myForm.appendChild(br1);

    let txtLastName = document.createElement("input");
    txtLastName.setAttribute("type", "text");
    txtLastName.placeholder = "Last Name";
    txtLastName.style.display = "block";
    txtLastName.id = "txtLastName";
    myForm.appendChild(txtLastName);
    myForm.appendChild(br2);

    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.id = "email";
    email.style.display = "block";
    email.placeholder = "email";
    email.required = true;
    myForm.appendChild(email);
    myForm.appendChild(br3);

    let passw = document.createElement("input");
    passw.setAttribute("type", "password");
    passw.id = "password";
    passw.style.display = "block";
    passw.placeholder = "password";
    passw.required = true;
    myForm.appendChild(passw);
    myForm.appendChild(br4);

    const lblAgree = document.createElement("label");
    lblAgree.innerText = "I agree to the Terms of Use";
    lblAgree.htmlFor = "chkAgree";
    myForm.appendChild(lblAgree);

    let chkAgree = document.createElement("input");
    chkAgree.setAttribute("type", "checkbox");
    chkAgree.id = "chkAgree";

    const divChkBox = document.createElement("div");
    divChkBox.id = "divChkBox";

    const divBtnSubmitSignUp = document.createElement("div");
    divBtnSubmitSignUp.id = "divBtnSubmitSignUp";

    let btnSubmitSU = document.createElement("button");
    btnSubmitSU.type = "button";
    btnSubmitSU.id = "btnSubmitSU";
    btnSubmitSU.innerText = "SUBMIT";

    /* Creating provisional buttons to query and clear the local storage */
    let btnQLS = document.createElement("button");
    btnQLS.type = "button";
    btnQLS.id = "btnQLS";
    btnQLS.innerText = "Query LS";

    let btnCLR = document.createElement("button");
    btnCLR.type = "button";
    btnCLR.id = "btnCLR";
    btnCLR.innerText = "Clear LS";

    let divQYCLR = document.createElement("div");
    divQYCLR.id = "divQYCLR";
    /** */

    const divBtnHome = document.createElement("div");
    divBtnHome.id = "divBtnHome";

    let btnHome = document.createElement("button");
    btnHome.type = "button";
    btnHome.id = "btnHome";
    btnHome.innerText = "HOME";

    let btnCLRSU = document.createElement("button");
    btnCLRSU.type = "button";
    btnCLRSU.id = "btnCLRSU";
    btnCLRSU.innerText = "CLEAR";
    
    divChkBox.appendChild(chkAgree);  
    divChkBox.appendChild(lblAgree);
    myForm.appendChild(divChkBox);
    divBtnHome.appendChild(btnHome);
    
    divBtnSubmitSignUp.appendChild(btnSubmitSU);
    divBtnSubmitSignUp.appendChild(btnCLRSU);
    myForm.appendChild(divBtnSubmitSignUp);
    myForm.appendChild(divBtnHome);
    
    //provisional buttons to query and clear the localStorage object
    divQYCLR.appendChild(btnQLS);
    divQYCLR.appendChild(btnCLR);
    myForm.appendChild(divQYCLR); 
    /** */

    divContainer.appendChild(myForm);

    btnSubmitSU.addEventListener("click", addUser);
    btnHome.addEventListener("click", removingElementsSUHome);
    btnCLRSU.addEventListener("click", clearSignUpUserData);

    function removingElementsSUHome(){
        divContainer.removeChild(myForm);
        landingPage();
    }

    function clearSignUpUserData(){
        txtFirstName.value = "";
        txtLastName.value = "";
        email.value = "";
        passw.value = "";
    }

    function addUser(){
        
        if(!chkAgree.checked){

            swal({
                text: "You must accept the terms of use!",
                icon: "error",
            });
        
        }else{

            if(txtFirstName.value === "" || txtLastName.value === "" || email.value === "" || passw.value === ""){

                swal({
                    text: "All fields are mandatory",
                    icon: "error",
                });
        
            }else{

                const fn = txtFirstName.value;
                const ln = txtLastName.value;
                const em = email.value;
                const pw = passw.value;
                
                emailGlobal = email.value;

                let saveToList = checkingEmail(em);

                if(saveToList !== -1){

                    swal({
                        text: "This email address already exists in our database.",
                        icon: "error",
                    });
                    
                    
                }else{
                    
                    if(pw.length<3){
            
                        swal({
                            text: "Your password must contain at least 3 characters",
                            icon: "error",
                        });
            
                    }else{

                        var newUser = {
                            fName : fn,
                            lName : ln,
                            email : em,
                            pwd : pw
                        }

                        console.log(newUser);
                        usersList.push(newUser);
                        localStorageUsersList(usersList);
                        swal({
                            title: "successfully added!",
                            icon: "success",
                        });

                    }

                }   

            }
        }

    }//end addUser()

    //Query users list
    var btnQueryLS = document.getElementById("btnQLS");
    btnQueryLS.addEventListener("click", getUsersList);

    function getUsersList(){

        var storedList = localStorage.getItem('localUsersList');
        console.log(storedList);

        if(storedList === null){
            usersList = [];
        }else{
            usersList = JSON.parse(storedList);
        }
        return usersList;
    } 

    //CLear Local Storage
    var btnCLRLS = document.getElementById("btnCLR");
    btnCLRLS.addEventListener("click", clearLocalStorageData);

    function clearLocalStorageData(){
        localStorage.clear();
    }

}//END signUp()


function logIn(){

    divContainer.removeChild(btnSignUp);
    divContainer.removeChild(btnLogIn);

    let myForm = document.createElement("form");
    myForm.id = "myForm";

    const br1 = document.createElement("br");
    const br2 = document.createElement("br");

    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.id = "email";
    email.style.display = "block";
    email.placeholder = "email";
    myForm.appendChild(email);
    myForm.appendChild(br1);

    let passw = document.createElement("input");
    passw.setAttribute("type", "password");
    passw.id = "password";
    passw.style.display = "block";
    passw.placeholder = "password";
    myForm.appendChild(passw);
    myForm.appendChild(br2);

    const divBtnSubmitLogIn = document.createElement("div");
    divBtnSubmitLogIn.id = "divBtnSubmitLogIn";

    let btnSubmitLI = document.createElement("button");
    btnSubmitLI.type = "button";
    btnSubmitLI.id = "btnSubmitLI";
    btnSubmitLI.innerText = "SUBMIT";

    const divBtnHome = document.createElement("div");
    divBtnHome.id = "divBtnHome";

    let btnHome = document.createElement("button");
    btnHome.type = "button";
    btnHome.id = "btnBack";
    btnHome.innerText = "HOME";

    divBtnSubmitLogIn.appendChild(btnSubmitLI);
    divBtnHome.appendChild(btnHome);
    myForm.appendChild(divBtnSubmitLogIn);
    myForm.appendChild(divBtnHome);
    divContainer.appendChild(myForm);

    btnSubmitLI.addEventListener("click", matchUser);
    btnHome.addEventListener("click", removingContent);

    function removingContent(){
        divContainer.removeChild(myForm);
        landingPage();
    }

    function matchUser(){
        
        let counter = 0;
        let users = JSON.parse(localStorage.getItem('localUsersList'));
        
        em = document.getElementById("email").value;
        passw = document.getElementById("password").value;
        
        emailGlobal = em;
        
        for(let user of users){
            if (em === user.email && passw === user.pwd){
                counter+=1;
            }
        }

        if(counter === 0){
            swal({
                text: "please verify your credentials!",
                icon: "error",
            });
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        }else{
            swal({
                title: "Welcome back!",
                icon: "success",
            });
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            divContainer.removeChild(myForm);
            dashBoard();
        }        

    }
    
}//END LogIn

/** DASHBOARD */
function dashBoard(){
    
    let divLogOutAccSett = document.createElement("div");
    divLogOutAccSett.id = "divLogOutAccSett";

    let btnLogOut = document.createElement("button");
    btnLogOut.type = "button";
    btnLogOut.id = "btnLogOut";
    btnLogOut.innerText = "Log Out";

    let btnAccountSettings = document.createElement("button");
    btnAccountSettings.type = "button";
    btnAccountSettings.id = "btnAccountSettings";
    btnAccountSettings.innerText = "Account Settings";

    let divDashBoard = document.createElement("div");
    divDashBoard.id = "divDashBoard";

    let btnNewList = document.createElement("button");
    btnNewList.type = "button";
    btnNewList.id = "btnNewList";
    btnNewList.innerText = "NEW";

    let divbtnNewList = document.createElement("div");
    divbtnNewList.id = "divbtnNewList";

    divbtnNewList.appendChild(btnNewList);
    divDashBoard.appendChild(divbtnNewList);

    divLogOutAccSett.appendChild(btnLogOut);
    divLogOutAccSett.appendChild(btnAccountSettings);
    
    divContainer.appendChild(divLogOutAccSett);
    divContainer.appendChild(divDashBoard);

    btnLogOut.addEventListener("click", removeElements);
    btnAccountSettings.addEventListener("click", accountSettings);

    function loadToDoListIndex(){

        btnNewList.addEventListener("click", newElement);

        let divToDoListIndex = document.createElement("div");
        divToDoListIndex.id = "divToDoListIndex";

        let ulToDoList = document.createElement("ul");
        ulToDoList.id = "ulToDoList";

        divToDoListIndex.appendChild(ulToDoList);
        divDashBoard.appendChild(divToDoListIndex);

        for (var i=0; i<5; i++){

            var liToDoList = document.createElement('li');
            liToDoList.id = "liToDoList"+i;
            //liToDoList.className = "checked";
        
            ulToDoList.appendChild(liToDoList);
            liToDoList.innerHTML= "This is the toDoList number: " + i;
        
        }

        liToDoList1.className = "checked";

        // Create a "close" button and append it to each list item
        var myNodelist = document.getElementsByTagName("LI");
        for (let i = 0; i < 5; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);
        }

        // Click on a close button to hide the current list item
        var close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < 5; i++) {
            close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            }
        }

        // Add a "checked" symbol when clicking on a list item
        var list = document.querySelector('ul');
        list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
        }, false);

        // Create a new list item when clicking on the "Add" button
        function newElement() {
            var li = document.createElement("li");
            var inputValue = document.getElementById("myInput").value;
            var t = document.createTextNode(inputValue);
            li.appendChild(t);
            if (inputValue === '') {
                alert("You must write something!");
            }else {
                document.getElementById("myUL").appendChild(li);
            }
            
            document.getElementById("myInput").value = "";
        
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
        
            for (i = 0; i < close.length; i++) {
                close[i].onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
                }
            }

        }
    }

    loadToDoListIndex();

    function removeElements(){
        
        var message = confirm("Are you sure to log out?");
        
        if(message){
            
            removeAllChildNodes(divContainer);    
            
            function removeAllChildNodes(element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            }
            landingPage();

        }else{
            
            return;
        }
        
    }

    function accountSettings(){

        btnAccountSettings.removeEventListener("click", accountSettings);

        divDashBoard.style.display = "none";

        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        const br3 = document.createElement("br");
        const br4 = document.createElement("br");

        let myForm2 = document.createElement("form");
        myForm2.id = "myForm2";

        let txtFirstName2 = document.createElement("input");
        txtFirstName2.setAttribute("type", "text");
        txtFirstName2.placeholder = "New First Name";
        txtFirstName2.style.display = "block";
        txtFirstName2.id = "txtFirstName2";
        myForm2.appendChild(txtFirstName2);
        myForm2.appendChild(br1);

        let txtLastName2 = document.createElement("input");
        txtLastName2.setAttribute("type", "text");
        txtLastName2.placeholder = "New Last Name";
        txtLastName2.style.display = "block";
        txtLastName2.id = "txtLastName2";
        myForm2.appendChild(txtLastName2);
        myForm2.appendChild(br2);

        let email2 = document.createElement("input");
        email2.setAttribute("type", "email");
        email2.id = "email2";
        email2.style.display = "block";
        email2.placeholder = "New email";
        email2.required = true;
        myForm2.appendChild(email2);
        myForm2.appendChild(br3);

        let passw2 = document.createElement("input");
        passw2.setAttribute("type", "password");
        passw2.id = "password2";
        passw2.style.display = "block";
        passw2.placeholder = "New password";
        passw2.required = true;
        myForm2.appendChild(passw2);
        myForm2.appendChild(br4);

        const divBtnSubmitModify = document.createElement("div");
        divBtnSubmitModify.id = "divBtnSubmitModify";

        let btnSubmitModify = document.createElement("button");
        btnSubmitModify.type = "button";
        btnSubmitModify.id = "btnSubmitModify";
        btnSubmitModify.innerText = "MODIFY";

        let btnCancel = document.createElement("button");
        btnCancel.type + "button";
        btnCancel.id = "btnCancel";
        btnCancel.innerText = "CANCEL";

        let btnClearEdit = document.createElement("button");
        btnClearEdit.type = "button";
        btnClearEdit.id = "btnClearEdit";
        btnClearEdit.innerText = "CLEAR";

        divBtnSubmitModify.appendChild(btnSubmitModify);
        divBtnSubmitModify.appendChild(btnClearEdit);
        divBtnSubmitModify.appendChild(btnCancel);
        myForm2.appendChild(divBtnSubmitModify);

        divContainer.insertBefore(myForm2, divDashBoard);

        btnSubmitModify.addEventListener("click", askForNewData);
        btnCancel.addEventListener("click", cancelEdition);
        btnClearEdit.addEventListener("click", clearEdition);

        function clearEdition(){
            document.getElementById("txtFirstName2").value = "";
            document.getElementById("txtLastName2").value = "";
            document.getElementById("email2").value = "";
            document.getElementById("password2").value = "";
        }

        function cancelEdition(){
            divContainer.removeChild(myForm2);
            divDashBoard.style.display =  "block";
            btnAccountSettings.addEventListener("click", accountSettings);
        }

        function askForNewData(){

            let userIndexMod;
            let currentEmail = "";

            btnAccountSettings.removeEventListener("click", askForNewData);
            
            if((document.getElementById("txtFirstName2").value === "" || document.getElementById("txtLastName2").value === "" || document.getElementById("email2").value === "" || document.getElementById("password2").value === "")){
                
                swal({
                    text: "All the fields are required",
                    icon: "error",
                });

            }else{
                
                let fn = document.getElementById("txtFirstName2").value;
                let ln = document.getElementById("txtLastName2").value;        
                let em = document.getElementById("email2").value;
                let passw = document.getElementById("password2").value;

                var storedList = localStorage.getItem('localUsersList');

                if(storedList === null){
                    usersList = [];
                }else{
                    usersList = JSON.parse(storedList);
                }

                currentEmail = prompt("Please enter your current email");
                let indexCurrentEmail = checkingEmail(currentEmail);
                console.log(indexCurrentEmail);
                console.log(currentEmail);

                if(currentEmail !== null){

                    if(currentEmail !== ""){

                        userIndexMod = checkingEmail(em);
                        console.log(userIndexMod);
                        
                        if(indexCurrentEmail !== -1){

                            if(userIndexMod === -1){
                                                    
                                usersList[indexCurrentEmail].fName = fn;
                                usersList[indexCurrentEmail].lName = ln;  
                                usersList[indexCurrentEmail].email = em;
                                usersList[indexCurrentEmail].pwd = passw;
                                localStorageUsersList2(usersList);

                            }else{

                                if(em === currentEmail){
                                    
                                    usersList[indexCurrentEmail].fName = fn;
                                    usersList[indexCurrentEmail].lName = ln;  
                                    usersList[indexCurrentEmail].email = em;
                                    usersList[indexCurrentEmail].pwd = passw;
                                    localStorageUsersList2(usersList);

                                }else{
                                    swal({
                                        text: "This email already exists!",
                                        icon: "error",
                                    });
    
                                }
                                
                            }

                        }else{

                            swal({
                                text: "There was an error!",
                                icon: "error",
                            });

                        }                        
                        
                    }else{

                        swal({
                            text: "There was an error!",
                            icon: "error",
                        });

                    }
                    
                }else{

                    swal({
                        text: "There was an error!",
                        icon: "error",
                    });               
                
                }

            console.log(usersList);

            }//END validation if...else

        }//END askForNewData()

    }//END accountSettings()   
    
}//END dashboard()


