const passwordInput = document.getElementById("password-input");
const progressBar = document.getElementById("progress-bar");
const strenghtLabel = document.getElementById("strength-label");

passwordInput.addEventListener("input", (e) =>{
    evaluateStrenght(e.target.value);
});

function evaluateStrenght(password){
    if(!password){
        updateUI(0, "Empty", "var(--text-dim)");
        return;
    }
    let score = 0;

    if(password.length >= 8) score += 1;
    if(password.length >= 12) score += 1;

    if(/[A-Z]/.test(password)) score += 1; // uppercase
    if(/[0-9]/.test(password)) score += 1; // Numbers
    if(/[^A-Za-z0-9]/.test(password)) score += 1; // Special Chars

    if(score <= 2){
        updateUI(33, "Weak", "var(--color-weak)");
    }else if(score <= 4){
        updateUI(66, "Medium", "var(--color-medium)");
    }else{
        updateUI(100, "Strong", "var(--color-strong)");
    }
}

function updateUI(width, text, color){
    progressBar.style.width = width + "%"
    progressBar.style.backgroundColor = color;
    strenghtLabel.innerText = text;
    strenghtLabel.style.color = color;
}

function generateSecurePassword(){
    const lenght = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let rtVal = "";

    const array = new Uint32Array(lenght);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < lenght; i++){
        rtVal += charset.charAt(array[i] % charset.length);
    }

    passwordInput.value = rtVal;
    evaluateStrenght(rtVal)

    passwordInput.select();
}