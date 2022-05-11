
let lastUserLogin = document.getElementById('user');
let currentUser = document.getElementById('present');
let input = document.getElementById('name');
 
const containerApp = document.querySelector('#item-1');
const labelTimer = document.querySelector('.counter');
const labelLogoutTimer = document.querySelector('.logout-timer');
let loginBtn = document.getElementById('login');

let deleteBtn = document.getElementById('delete');
let list = document.getElementById('list');

        let userStorage = [];

        let storageArray = JSON.parse(localStorage.getItem("isahProject")) || [];


        // to find lastuser login ???????????????????????

        lastuser = storageArray.find(function(store){
            return store.logMode == 'lastuser';
        })

        if (lastuser) {

            lastUserLogin.innerText = `${lastuser.loginStatus}`;
            currentUser.innerText = `Welcome back, ${lastuser.name}`;
            labelLogoutTimer.innerHTML = '<span class="time" id="'+lastuser.name+'">'+lastuser.time+'</span><span > sec remaining</span>';
            
        }else{
            lastUserLogin.innerText = ' ';
            currentUser.innerText = `Log in to get started`
        }




        // fecting user and status from local storage

        function fetct(){
            let outpout = '<ul>';

            storageArray.forEach(function(val){

                outpout += '<li>'+val.name+' <span class="status" id="'+val.name+'btn">'+val.loginStatus+'</span> <button class="presonal_logout" data-name="'+val.name+'" >logout</button><br></li>';

                lastUserLogin.innerText = `${lastuser.loginStatus}`;
                currentUser.innerText = `Welcome back, ${lastuser.name}`;
                containerApp.style.opacity = 100;
            });

            outpout += '</ul>';

            list.innerHTML = outpout;
            // user_time_remaining--;
            

        }

        fetct();

        //console.log(lastuserArray);
        //console.log(lastuser);


        // login user ?????????????????

        loginBtn.addEventListener('click', function(){

            let formValue = input.value;

            let inputValue = formValue.toLowerCase()

            if (inputValue == '') {

                alert('enter value');
                
            }else{

                
                // checking if user alreay exit ::::::::::::::::


                checkuser = storageArray.filter(function(store){
                    return store.name == inputValue;
                })

                if (checkuser.length > 0) {

                    let getuser = checkuser[0];

                    // checking if user loginstatus is login

                    if (getuser.loginStatus == 'active') {
                        
                        alert('this user name already login');

                        let arrayone = [];

                        storageArray.forEach(function(store){
                            if (store.name == inputValue) {
                                containerApp.style.opacity = 100;

                                let objone = {name: store.name, loginStatus: store.loginStatus, logMode: 'lastuser', time: 60};
                                arrayone.push(objone);
                            }else{

                                let objone = {name: store.name, loginStatus: store.loginStatus, logMode: 'not last user', time: store.time};
                                arrayone.push(objone);

                            }
                        })


                        localStorage.setItem("isahProject", JSON.stringify(arrayone));


                        // if user loginstaatus is logout :::::::::::::::::::::
                    }else{
                        alert('this user name already logout');

                        let arraytwo = [];


                        storageArray.forEach(function(store){
                            if (store.name == inputValue) {
                                
                                let objtwo = {name: store.name, loginStatus: 'active', logMode: 'lastuser', time: 60};
                                arraytwo.push(objtwo);
                            }else{

                                let objtwo = {name: store.name, loginStatus: store.loginStatus, logMode: 'not last user', time: store.time};
                                arraytwo.push(objtwo);

                            }
                        })


                        localStorage.setItem("isahProject", JSON.stringify(arraytwo));

                    }
                    
                    
                }else{

                    // login new user name :::::::::::::::::::::::::

                    containerApp.style.opacity = 100;
                
                    storageArray.forEach(element => {

                        let storeobbjectAgain = {name: element.name, loginStatus: element.loginStatus, logMode: 'not last user', time: element.time};

                        userStorage.push(storeobbjectAgain);
                        
                    });
                    

                    let storageObject = {name: inputValue, loginStatus: 'active', logMode: 'lastuser',  time: 60};

                    userStorage.push(storageObject);

                    localStorage.setItem("isahProject", JSON.stringify(userStorage));

                   
                }

                window.location.reload();

            }

            fetct();

        

            //console.log(storageArray);
        })





// deleting all user 
deleteBtn.addEventListener('click', function(){
    localStorage.removeItem("isahProject");
    window.location.reload();
});


// loging out each user 
//let userLogout = document.getElementsByClassName('presonal_logout');
let userLogout = document.querySelectorAll('.presonal_logout');

userLogout.forEach(function(user){
    user.addEventListener('click', function(event){
                console.log(userLogout);
                

        let userName = event.target.dataset.name;
        let arrayThree = [];


        storageArray.forEach(function(store){
            if (store.name == userName) {
                let objtre = {name: store.name, loginStatus: 'offline', logMode: store.logMode, time: 0};
                        arrayThree.push(objtre);

                // After clicking the personal logout button the UI should return to it's initial state. While hiding the web app content. With this message - "Log in to get started"
                containerApp.style.opacity = 0;
                lastUserLogin.innerText = ' ';
                currentUser.innerText = `Log in to get started`;
            }else{
                let objtre = {name: store.name, loginStatus: store.loginStatus, logMode: store.logMode, time: store.time};
                arrayThree.push(objtre);
            }
        });   
            localStorage.setItem("isahProject", JSON.stringify(arrayThree));
                alert(userName+' successfully logout');

            window.location.reload();
            });
        });

        
        // timing logout
setInterval(() => {
    
    let arrayfour = [];
    
    storageArray.forEach(function(store){
    
        let user_name = store.name;
        //console.log(user_name);
        
        let person =  document.getElementById(user_name);
        
        let user_time_remaining = person.textContent;

        if (user_time_remaining <= 0) {

            let id = user_name+'btn';

            person.textContent = user_time_remaining;
            
            document.getElementById(id).textContent = 'offline';
            
            let objfour = {name: store.name, loginStatus: 'logout', logMode: store.logMode, time: 0};
            
            arrayfour.push(objfour);
            currentUser.innerText = `Log in to get started`;
            containerApp.style.opacity = 0;
            lastUserLogin.innerText = ' ';
            
        }else{
            
            user_time_remaining--;
            
            person.textContent = user_time_remaining;
            
            let id = user_name+'btn';
            
            document.getElementById(id).textContent = 'active';
            
            let objfour = {name: store.name, loginStatus: 'active', logMode: store.logMode, time: user_time_remaining};
            
            arrayfour.push(objfour);
            
            
        }
    })

    localStorage.setItem("isahProject", JSON.stringify(arrayfour));
    
}, 1000);


document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        if (lastuser) {
            //Display UI and message
            // labelWelcome.textContent = `Welcome back, ${user}`;
            // containerApp.style.opacity = 100;
        }
    } else {
        setTimeout( () => {
            let objtre = {name: store.name, loginStatus: 'offline', logMode: store.logMode};
            arrayThree.push(objtre);

            currentUser.innerText = `Log in to get started`;
            containerApp.style.opacity = 0;
            lastUserLogin.innerText = ' ';
        }, 60000);
    }
});