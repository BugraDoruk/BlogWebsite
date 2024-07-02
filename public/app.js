document.addEventListener('DOMContentLoaded', event => {

    const app = firebase.app();
    console.log(app);
}); 

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log);


}
function sendContactForm(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
        name: name,
        email: email,
        message: message
    };

    fetch('https://us-central1-your-project-id.cloudfunctions.net/sendContactEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        const message = result.message;
            document.write(`Hello ${message.name}`);
            console.log(message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message.');
    });
}
