let ans = Math.floor(Math.random() * 10) + 1; 
const btn = document.getElementById('btn');
let msg = document.getElementById('msg');
let count = 0; 

btn.addEventListener('click', (event) => {
    event.preventDefault(); 
    const guess = document.getElementById('guess').value; 

    if (!isNaN(guess) && guess !== '') {
        if(guess<1 || guess>10){
            msg.innerText="Enter A Valid Number";
        }

       else if (parseInt(guess) == ans) {
            msg.innerText = 'Congratulations! You guessed it right!';
            count = 0; 
            ans = Math.floor(Math.random() * 10) + 1; 
        } else {
            msg.innerText = "You're wrong! Have another go.";
            count++;
        }

        document.getElementById('count').innerText = `${count}`; 
        document.getElementById('guess').value = '';
    } else {
        msg.innerText = "Enter A Number"; 
    }
});
