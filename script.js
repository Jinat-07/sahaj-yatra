const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhhkcdN7o9F4NFpycDai_FzJEgf5UmxRrBtgcwGXbIwLhmVcgX_LPfjTZL-5DBXv3rPw/exec"; // এখানে আপনার URL বসান
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
    btn.innerHTML = '<span class="spinner"></span>'; // লোডিং স্পিনার
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
    
    document.getElementById('start-node').placeholder = dict.fromPlaceholder;
    document.getElementById('end-node').placeholder = dict.toPlaceholder;
}

// ৪. বাস সার্চ লজিক (Professional Card Design)
function searchBuses() {
    const start = document.getElementById('start-node').value.trim().toLowerCase();
    const end = document.getElementById('end-node').value.trim().toLowerCase();
    const resultArea = document.getElementById('result-area');
    
    if (!start || !end) return;

    // ফিল্টারিং (আপনার শিটের কলাম অনুযায়ী)
    const filteredBuses = appData.buses.filter(bus => 
        bus.route.toLowerCase().includes(start) && bus.route.toLowerCase().includes(end)
    );

    resultArea.innerHTML = '';

    if (filteredBuses.length === 0) {
        resultArea.innerHTML = `<p style="text-align:center; margin-top:20px;">${translations[currentLang].noResult}</p>`;
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
                    <span><strong>${translations[currentLang].time}</strong> ${bus.time}</span>
                    <span class="fare-tag">${translations[currentLang].fare} ৳${bus.fare}</span>
                </div>
            </div>
            <div class="save-icon">
                <i class="far fa-heart" onclick="toggleSaveRoute('${bus.id}')"></i>
            </div>
        `;
        resultArea.appendChild(card);
    });
}

// ৫. স্ক্রিন সুইচ এবং নেভিগেশন
function switchTab(screenId, el) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    el.classList.add('active');
}

// ৬. নোটিশ বোর্ড
function renderNotices() {
    const list = document.getElementById('notice-list');
    const dot = document.getElementById('notice-dot');
    
    if (!appData.notices || appData.notices.length === 0) {
        dot.style.display = 'none';
        list.innerHTML = '<p>No updates today.</p>';
        return;
    }

    dot.style.display = 'block';
    list.innerHTML = appData.notices.reverse().map(n => `
        <div class="notice-item">
            <strong>${n.title}</strong>
            <p>${n.message}</p>
            <small>${n.date}</small>
        </div>
    `).join('');
}

function toggleNoticeBoard() {
    document.getElementById('notice-board').classList.toggle('hidden');
    document.getElementById('notice-dot').style.display = 'none';
}

// ৭. ডার্ক মোড
function toggleDarkMode() {
    const body = document.documentElement;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
}

// ৮. লগইন চেক
function checkLogin() {
    const user = JSON.parse(localStorage.getItem('localUser'));
    if (user) {
        document.getElementById('auth-ui').classList.add('hidden');
        document.getElementById('user-profile').classList.remove('hidden');
        document.getElementById('user-profile').innerHTML = `
            <div class="profile-card">
                <i class="fas fa-user-circle fa-4x" style="color:var(--primary)"></i>
                <h2>${user.name}</h2>
                <p>${user.email}</p>
                <button onclick="handleLogout()" class="logout-btn">Logout</button>
            </div>
        `;
    }
}

function handleLogout() {
    localStorage.removeItem('localUser');
    location.reload();
}
