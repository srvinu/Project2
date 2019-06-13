$(document).ready(() => {
  // const config = {
  //   apiKey: "AIzaSyBrgkl5Ln1jCQ0QhJALlppANBNmnS9uYwU",
  //   authDomain: "ecafeteria-181df.firebaseapp.com",
  //   databaseURL: "https://ecafeteria-181df.firebaseio.com",
  //   projectId: "ecafeteria-181df",
  //   storageBucket: "",
  //   messagingSenderId: "71176722023",
  //   appId: "1:71176722023:web:e4cdcddcbcbd69f6"
  // };
  const config = {
    apiKey: 'AIzaSyBiZI8F7hHMaxIdiE35dtF2zcyg2pecbSM',
    authDomain: 'eventualities-c1d22.firebaseapp.com',
    databaseURL: 'https://eventualities-c1d22.firebaseio.com',
    projectId: 'eventualities-c1d22',
    storageBucket: 'eventualities-c1d22.appspot.com',
    messagingSenderId: '612928900643',
  };
  firebase.initializeApp(config);

  $('#signup').on('click', (event) => {
    event.preventDefault();
    const email = $('#exampleInputEmail1').val().trim();
    const password = $('#exampleInputPassword1').val().trim();
    const name = $('#name').val().trim();
    const number = $('#ph-number').val().trim();
    const zip = $('#zip-code').val().trim();
    const newUser = {
      userName: name,
      phNumber: number,
      zipCode: zip,
    };
    const user = firebase.auth().currentUser;


    // firebase.auth().createUserWithEmailAndPassword(email, password);


    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        // const errorToast = error;
        // location.reload();
        console.log(error.message)
        $('#signup-error').text(error.message);
      });


    firebase.database().ref(`/users/${user.uid}`).child('/profile').push(newUser);

    $('#exampleInputEmail1').val('');
    $('#exampleInputPassword1').val('');
    $('#first-name').val('');
    $('#last-name').val('');
    $('#name').val('');
    $('#ph-number').val('');
    $('#zip-code').val('');
    // window.location = 'http://localhost:8080/'
  });

  $('#login').on('click', (event) => {
    event.preventDefault();

    const email = $('#exampleInputEmail1').val().trim();
    const password = $('#exampleInputPassword1').val().trim();
    sessionStorage.setItem('username', email);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          window.location = 'http://localhost:8080/order';
        }
      })
      .catch((error) => {
        const errorToast = error;
        $('#signin-error').text(errorToast.message);
        // setTimeout(() => { location.reload(); }, 3000);
      });

    $('#exampleInputEmail1').val('');
    $('#exampleInputPassword1').val('');
  });

  $('#reset').on('click', (event) => {
    event.preventDefault();
    const auth = firebase.auth();
    const emailAddress = $('#exampleInputEmail1').val().trim();
    auth.sendPasswordResetEmail(emailAddress).then(() => {

    });
    $('#exampleInputEmail1').val('');
  });

  $('#logout').on('click', (event) => {
    event.preventDefault();
    firebase.auth().signOut();


    const user = firebase.auth().currentUser;
    if (user) {
      // console.log(user);
      window.location = 'http://localhost:3000/login';
    }
  });

});
