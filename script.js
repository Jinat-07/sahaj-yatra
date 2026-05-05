const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhhkcdN7o9F4NFpycDai_FzJEgf5UmxRrBtgcwGXbIwLhmVcgX_LPfjTZL-5DBXv3rPw/exec";
let appData = { routes: [], buses: [], notices: [], users: [] };

// ১. ডিকশনারি (ভাষা পরিবর্তন)
const translations = {
    bn: {
        appName: "সহজ যাতায়াত",
        searchBtn: "বাস খুঁজুন",
        loginTitle: "লগইন করুন",
        loginBtn: "প্রবেশ করুন",
        navSearch: "খুঁজুন",
        navProfile: "প্রোফাইল",
        fromPlaceholder: "কোথা থেকে?",
        toPlaceholder: "কোথায় যাবেন?",
        noResult: "দুঃখিত, কোনো বাস পাওয়া যায়নি!",
        fare: "ভাড়া:",
        time: "সময়:"
    },
    en: {
        appName: "Sahaj Yatra",
        searchBtn: "Search Buses",
        loginTitle: "Login to Account",
        loginBtn: "Sign In",
        navSearch: "Search",
        navProfile: "Profile",
        fromPlaceholder: "From where?",
        toPlaceholder: "To where?",
        noResult: "Sorry, no buses found!",
        fare: "Fare:",
        time: "Time:"
    }
};

let currentLang = localStorage.getItem('appLang') || 'bn';

// ২. পেজ লোড হলে কার্যক্রম শুরু
window.onload = () => {
    applyLanguage(currentLang);
    fetchData();
    checkLogin();
};

async function fetchData() {
    const btn = document.getElementById('search-btn');
    if (btn) btn.innerHTML = '<span class="spinner"></span>'; // লোডিং স্পিনার
    try {
        const res = await fetch(SCRIPT_URL);
        appData = await res.json();
        renderNotices();
    } catch (e) {
        console.error("Data Fetch Error:", e);
    } finally {
        applyLanguage(currentLang); // বাটন টেক্সট আগের অবস্থায় আনা
    }
}

// ৩. ভাষা পরিবর্তন লজিক
function toggleLanguage() {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    localStorage.setItem('appLang', currentLang);
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (dict[key]) el.innerText = dict[key];
    });
    
    const startNode = document.getElementById('start-node');
    const endNode = document.getElementById('end-node');
    if (startNode) startNode.placeholder = dict.fromPlaceholder;
    if (endNode) endNode.placeholder = dict.toPlaceholder;
}

// ৪. বাস সার্চ লজিক (Professional Card Design)
function searchBuses() {
    const startInput = document.getElementById('start-node');
    const endInput = document.getElementById('end-node');
    const resultArea = document.getElementById('result-area');
    
    if (!startInput || !endInput || !resultArea) return;

    const start = startInput.value.trim().toLowerCase();
    const end = endInput.value.trim().toLowerCase();
    
    if (!start || !end) return;

    // ফিল্টারিং লজিক
    const filteredBuses = (appData.buses || []).filter(bus => 
        bus.route && bus.route.toLowerCase().includes(start) && bus.route.toLowerCase().includes(end)
    );

    resultArea.innerHTML = '';

    if (filteredBuses.length === 0) {
        resultArea.innerHTML = `<p style="text-align:center; margin-top:30px; color: var(--sub-text);">${translations[currentLang].noResult}</p>`;
        return;
    }

    filteredBuses.forEach(bus => {
        const card = document.createElement('div');
        card.className = 'bus-card';
        card.innerHTML = `
            <div class="bus-info">
                <div class="bus-header">
                    <span class="bus-name"><i class="fas fa-bus"></i> ${bus.name}</span>
                    <span class="bus-type">${bus.type || 'Local'}</span>
                </div>
                <div class="bus-route">
                    <small>${bus.route}</small>
                </div>
                <div class="bus-footer">
                    <span><strong>${translations[currentLang].time}</strong> ${bus.time || 'N/A'}</span>
                    <span class="fare-tag">${translations[currentLang].fare} ৳${bus.fare || '0'}</span>
                </div>
            </div>
            <div class="save-icon">
                <i class="far fa-heart" onclick="toggleSaveRoute('${bus.id || bus.name}')"></i>
            </div>
        `;
        resultArea.appendChild(card);
    });
}

// ৫. স্ক্রিন সুইচ এবং নেভিগেশন (Display Bug Fixed)
function switchTab(screenId, el) {
    // সব স্ক্রিন হাইড করা
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    // সব নেভ আইটেম থেকে অ্যাক্টিভ ক্লাস রিমুভ করা
    document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
    
    // নির্দিষ্ট স্ক্রিনটি শো করা
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.style.display = 'block';
    }
    
    // ক্লিক করা বাটনে অ্যাক্টিভ ক্লাস দেওয়া
    if (el) el.classList.add('active');
}

// ৬. নোটিশ বোর্ড
function renderNotices() {
    const list = document.getElementById('notice-list');
    const dot = document.getElementById('notice-dot');
    
    if (!list) return;
    if (!appData.notices || appData.notices.length === 0) {
        if (dot) dot.style.display = 'none';
        list.innerHTML = '<p style="text-align:center; color:var(--sub-text);">No updates today.</p>';
        return;
    }

    if (dot) dot.style.display = 'block';
    list.innerHTML = appData.notices.reverse().map(n => `
        <div class="notice-item">
            <strong>${n.title}</strong>
            <p>${n.message}</p>
            <small>${n.date || ''}</small>
        </div>
    `).join('');
}

function toggleNoticeBoard() {
    const board = document.getElementById('notice-board');
    const dot = document.getElementById('notice-dot');
    if (board) board.classList.toggle('hidden');
    if (dot) dot.style.display = 'none';
}

// ৭. ডার্ক মোড
function toggleDarkMode() {
    const body = document.documentElement;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ৮. লগইন ও প্রোফাইল লজিক (Missing Handlers Added)
function checkLogin() {
    const user = JSON.parse(localStorage.getItem('localUser'));
    const authUi = document.getElementById('auth-ui');
    const userProfile = document.getElementById('user-profile');
    
    if (!authUi || !userProfile) return;

    if (user) {
        authUi.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userProfile.innerHTML = `
            <div class="profile-card">
                <i class="fas fa-user-circle fa-4x" style="color:var(--primary)"></i>
                <h2>${user.name || 'User'}</h2>
                <p>${user.email}</p>
                <button onclick="handleLogout()" class="logout-btn">Logout</button>
            </div>
        `;
    } else {
        authUi.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

function handleLogin() {
    const email = document.getElementById('l-email')?.value.trim();
    const pass = document.getElementById('l-pass')?.value.trim();
    
    if (!email || !pass) {
        alert("Please fill in all fields.");
        return;
    }

    // ডেমো লগইন সেশন (পরবর্তীতে ব্যাকএন্ড ভেরিফিকেশন যুক্ত করতে পারবেন)
    const demoUser = { name: email.split('@')[0], email: email };
    localStorage.setItem('localUser', JSON.stringify(demoUser));
    checkLogin();
}

function handleLogout() {
    localStorage.removeItem('localUser');
    checkLogin();
}

// ৯. অতিরিক্ত ফাংশনসমূহ (বাটন এরর এড়াতে)
function toggleAuth(isLogin) {
    const title = document.querySelector('#login-form h3');
    const btn = document.querySelector('#login-form button span');
    const toggleText = document.querySelector('.toggle-auth');
    
    if (isLogin) {
        if (title) title.innerText = translations[currentLang].loginTitle;
        if (btn) btn.innerText = translations[currentLang].loginBtn;
        if (toggleText) toggleText.innerText = "নতুন অ্যাকাউন্ট তৈরি করুন";
        toggleText.setAttribute('onclick', 'toggleAuth(false)');
    } else {
        if (title) title.innerText = "অ্যাকাউন্ট তৈরি করুন";
        if (btn) btn.innerText = "সাইন আপ";
        if (toggleText) toggleText.innerText = "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন";
        toggleText.setAttribute('onclick', 'toggleAuth(true)');
    }
}

function toggleSaveRoute(busId) {
    // রুট সেভ করার বেসিক মেকানিজম
    let saved = JSON.parse(localStorage.getItem('savedRoutes')) || [];
    if (saved.includes(busId)) {
        saved = saved.filter(id => id !== busId);
        alert("রুটটি মুছে ফেলা হয়েছে।");
    } else {
        saved.push(busId);
        alert("রুটটি সফলভাবে সেভ করা হয়েছে!");
    }
    localStorage.setItem('savedRoutes', JSON.stringify(saved));
}
