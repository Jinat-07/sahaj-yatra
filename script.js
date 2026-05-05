// ১. ভাষার শব্দভাণ্ডার
const translations = {
    bn: {
        appName: "সহজ যাতায়াত",
        searchBtn: "বাস খুঁজুন",
        loginTitle: "লগইন করুন",
        loginBtn: "প্রবেশ করুন",
        navSearch: "খুঁজুন",
        navProfile: "প্রোফাইল",
        fromPlaceholder: "কোথা থেকে?",
        toPlaceholder: "কোথায় যাবেন?"
    },
    en: {
        appName: "Sahaj Yatra",
        searchBtn: "Search Buses",
        loginTitle: "Login to Account",
        loginBtn: "Sign In",
        navSearch: "Search",
        navProfile: "Profile",
        fromPlaceholder: "From where?",
        toPlaceholder: "To where?"
    }
};

let currentLang = localStorage.getItem('appLang') || 'bn'; // ডিফল্ট ভাষা বাংলা

// ২. পেজ লোড হলে ভাষা সেট করা
window.onload = () => {
    applyLanguage(currentLang);
    // ... আপনার বাকি ফাংশন (fetchData, checkLogin ইত্যাদি)
};

// ৩. ভাষা পরিবর্তন করার ফাংশন
function toggleLanguage() {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    localStorage.setItem('appLang', currentLang);
    applyLanguage(currentLang);
}

// ৪. পুরো অ্যাপে ভাষা প্রয়োগ করার ফাংশন
function applyLanguage(lang) {
    const dict = translations[lang];

    // সাধারণ টেক্সট পরিবর্তন
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (dict[key]) {
            el.innerText = dict[key];
        }
    });

    // ইনপুট প্লেসহোল্ডার পরিবর্তন
    const startNode = document.getElementById('start-node');
    const endNode = document.getElementById('end-node');
    if (startNode) startNode.placeholder = dict.fromPlaceholder;
    if (endNode) endNode.placeholder = dict.toPlaceholder;
}