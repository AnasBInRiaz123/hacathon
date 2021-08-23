// User Inputs
const uname = document.getElementById("uname")
const uemail = document.getElementById("uemail")
const uphone = document.getElementById("uphone")
const ucountry = document.getElementById("ucountry")
const ucity = document.getElementById("ucity")
const upsw = document.getElementById("upsw")

// Restaurant Inputs
const rname = document.getElementById("rname")
const remail = document.getElementById("remail")
const rcountry = document.getElementById("rcountry")
const rcity = document.getElementById("rcity")
const rpsw = document.getElementById("rpsw")

// User Signup
const signUpUser = () => {
    firebase.auth().createUserWithEmailAndPassword(uemail.value, upsw.value)
        .then((userCredential) => {
            var user = userCredential.user;
            const database = firebase.database().ref('User_Profile')
            var Profile = {
                uname: uname.value,
                uemail: uemail.value,
                uphone: uphone.value,
                ucountry: ucountry.value,
                ucity: ucity.value,
                upassword: upsw.value,
                userid: user.uid
            }
            database.child(user.uid).set(Profile)
            setTimeout("window.open('loginuser.html', '_self')", 4000);
            // setTimeout("window.open('home.html', '_self')", 3000);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}

// restaurant Signup
const signUpRestaurant = () => {
    firebase.auth().createUserWithEmailAndPassword(remail.value, rpsw.value)
        .then((userCredential) => {
            var user = userCredential.user;
            const database = firebase.database().ref('Restaurant_Profile')
            var Profile = {
                rname: rname.value,
                remail: remail.value,
                rcountry: rcountry.value,
                rcity: rcity.value,
                rpassword: rpsw.value,
                rserid: user.uid
            }
            database.child(user.uid).set(Profile)
            // window.open('loginrestaurant.html', '_self');
            setTimeout("window.open('loginrestaurant.html', '_self')", 4000);


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}

// User Signin
const userLogIn = () => {
    firebase.auth().signInWithEmailAndPassword(uemail.value, upsw.value)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log(user.uid)
            // window.open('dashuser.html', '_self');
            setTimeout("window.open('user.html', '_self')", 4000);






        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}


const restaurantLogIn = () => {
    firebase.auth().signInWithEmailAndPassword(remail.value, rpsw.value)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log(user.uid)
            // window.open('restaurant.html', '_self');
            setTimeout("window.open('restaurant.html', '_self')", 4000);


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}




// Logout
const onLogout = () => {
    firebase.auth().signOut().then(() => {
        window.open('loginuser.html', '_self')
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}



// Add Dishes


const addDishes = () => {

    var itemname = document.getElementById("itemname")
    var price = document.getElementById("price")

    var category = document.getElementById("category");
    var cat = category.value; // 2
    var cat = category.options[category.selectedIndex].text; //test2

    var deliverytype = document.getElementById("deliverytype");
    var delv = deliverytype.value; // 2
    var delv = deliverytype.options[deliverytype.selectedIndex].text; //test2

    const user = firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            console.log(user.uid)
            const database = firebase.database().ref('dishes')
            var key = database.push().key;
            var Dishes = {
                itemname: itemname.value,
                price: price.value,
                category: cat,
                deliverytype: delv,
                // key: key,

            }
            database.child(user.uid).child(key).set(Dishes)
            // window.open('index.html','_self');

        } else {
            // No user is signed in.
        }
    })
}






const myDishes = () => {
    const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid)
            const carditem = document.getElementById("carditem")

            firebase.database().ref(`dishes/${user.uid}`).on('child_added', function (data) {
                var card = document.createElement('div');
                card.setAttribute("class", "col-sm-12 col-md-6 col-lg-3")
                var cardhtml = `<div class="card">
                <img src="images/food.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Item Name: ${data.val().itemname}</h5>
                <p class="card-text">Price: ${data.val().price}</p>
                <p class="card-text">Category: ${data.val().category}</p>
                <p class="card-text">Delivery Type: ${data.val().deliverytype}</p>

                
                <button type="button" class="btn btn-primary">Order Now</button>

                </div>
                </div>`
                card.innerHTML = cardhtml
                carditem.appendChild(card)

            })
        } else {
            console.log("error")
        }
    });


}
const resTaurants = () => {
    const carditem = document.getElementById("carditem")
    firebase.database().ref(`Restaurant_Profile`).on('child_added', function (data) {
        var card = document.createElement('div');
        card.setAttribute("class", "col-sm-12 col-md-6 col-lg-3")
        var cardhtml = `<div class="card">
                <a href=""><img src="images/food.jpg" class="card-img-top" alt="..."></a>
                <div class="card-body">
                <h5 class="card-title">Restaurant Name: ${data.val().rname}</h5>
                <p class="card-text">Email: ${data.val().remail}</p>
                <p class="card-text">Country: ${data.val().rcountry}</p>
                <p class="card-text">City: ${data.val().rcity}</p>
                <button onclick="getRestaurant()" class="btn btn-primary">Go to Shop</button>
                </div>
                </div>`
        card.innerHTML = cardhtml
        carditem.appendChild(card)
    })
}
const getRestaurant = () => {
    setTimeout("window.open('dashuser.html','_self')", 1000);
}

const restDishes = () => {

    firebase.database().ref(`Restaurant_Profile`).on('child_added', function (data) {
        console.log(data.val().rserid);
        firebase.database().ref(`dishes/${data.val().rserid}`).on('child_added', function (data) {
            const carditem = document.getElementById("carditem")
            var card = document.createElement('div');
            card.setAttribute("class", "col-sm-12 col-md-6 col-lg-3")
            var cardhtml = `<div class="card">
                <img src="images/food.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Item Name: ${data.val().itemname}</h5>
                <p class="card-text">Price: ${data.val().price}</p>
                <p class="card-text">Category: ${data.val().category}</p>
                <p class="card-text">Delivery Type: ${data.val().deliverytype}</p>                
                <button onclick="Order()" class="btn btn-primary">Order</button>
                </div>
                </div>`
            card.innerHTML = cardhtml
            carditem.appendChild(card)
        })
    })
}

const Order = () => {
    const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
    firebase.database().ref(`Restaurant_Profile`).on('child_added', function (data) {
            firebase.database().ref(`dishes/${data.val().rserid}`).on('child_added', function (data) {
                const database = firebase.database().ref('Order')
                var key = database.push().key;
                var Dish = {
                    itemname: data.val().itemname,
                    price: data.val().price,
                    category: data.val().category,
                    dileverytype: data.val().delvtype,
                    restaurent: user.uid,
                }
                database.child(user.uid).child(key).set(Dish)

            }
            )
        }
    )
    setTimeout("window.open('user.html', '_self')", 3000);
}
})
}

const Pending = () => {
    const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid)
            const carditem = document.getElementById("carditem")

            firebase.database().ref(`dishes/${user.uid}`).on('child_added', function (data) {
                var card = document.createElement('div');
                card.setAttribute("class", "col-sm-12 col-md-6 col-lg-3")
                var cardhtml = `<div class="card">
                <img src="images/food.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Item Name: ${data.val().itemname}</h5>
                <p class="card-text">Price: ${data.val().price}</p>
                <p class="card-text">Category: ${data.val().category}</p>
                <p class="card-text">Delivery Type: ${data.val().deliverytype}</p>                
                <button onclick="Edit(this)" id="${data.val().restaurent}" class="btn btn-primary">Accepted</button>
                </div>
                </div>`
                card.innerHTML = cardhtml
                carditem.appendChild(card)
            })
        } else {
            console.log("error")
        }
    })
}



const Accepted = () => {
    const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid)
            const carditem = document.getElementById("carditem")

            firebase.database().ref(`dishes/${user.uid}`).on('child_added', function (data) {
                var card = document.createElement('div');
                card.setAttribute("class", "col-sm-12 col-md-6 col-lg-3")
                var cardhtml = `<div class="card">
                <img src="images/food.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Item Name: ${data.val().itemname}</h5>
                <p class="card-text">Price: ${data.val().price}</p>
                <p class="card-text">Category: ${data.val().category}</p>
                <p class="card-text">Delivery Type: ${data.val().deliverytype}</p>
                <button onclick="Delete(this)" id="${data.val().restaurent}" class="btn btn-primary">Delivered</button>
                </div>
                </div>`
                card.innerHTML = cardhtml
                carditem.appendChild(card)
            })
        } else {
            console.log("error")
        }
    })
}


const Delivered = () => {
    const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid)
            const carditem = document.getElementById("carditem")

            firebase.database().ref(`dishes/${user.uid}`).on('child_added', function (data) {
                var card = document.createElement('div');
                card.setAttribute("class", "col-sm-12 col-md-6 col-lg-3")
                var cardhtml = `<div class="card">
                <img src="images/food.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Item Name: ${data.val().itemname}</h5>
                <p class="card-text">Price: ${data.val().price}</p>
                <p class="card-text">Category: ${data.val().category}</p>

                <p class="card-text">Delivery Type: ${data.val().deliverytype}</p>
                </div>
                </div>`
                card.innerHTML = cardhtml
                carditem.appendChild(card)
            })
        } else {
            console.log("error")
        }
    })
}
