/* b:\All\1\jj2b\js\script.js */

/**
 * Update Kick Stream Status and Follower Count
 * Securely handles fetching and UI updates.
 */
async function updateKickStatus() {
    const statusEl = document.getElementById('stream-status');
    const followersEl = document.getElementById('follower-count');
    
    if (!statusEl || !followersEl) return;

    try {
        // MOCKING REAL DATA FOR DEMO
        // In production, this should ideally be handled via a secure backend proxy
        const isOnline = false; // Simulated status
        const followerCount = "23.8K"; // Simulated follower count
        
        // Security: Use innerText for simple text updates to prevent potential XSS
        if (isOnline) {
            statusEl.innerHTML = '<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span>بث مباشر الآن!</span>';
            statusEl.className = 'status-online text-sm flex items-center gap-1';
        } else {
            statusEl.innerHTML = '<span class="w-2 h-2 rounded-full bg-red-500"></span><span>أوف لاين</span>';
            statusEl.className = 'status-offline text-sm flex items-center gap-1';
        }
        
        followersEl.innerText = `${followerCount} متابع`;
    } catch (error) {
        console.error('Error fetching Kick status:', error);
        followersEl.innerText = 'غير قادر على تحميل البيانات';
    }
}

// Initial update and interval
document.addEventListener('DOMContentLoaded', () => {
    updateKickStatus();
    setInterval(updateKickStatus, 60000); // Update every minute

    // Custom Cursor logic
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
        follower.style.left = `${e.clientX - 4}px`;
        follower.style.top = `${e.clientY - 4}px`;
    });

    // Cursor scale on hover
    document.querySelectorAll('a, .card').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(0.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        });
    });

    // AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            mirror: false
        });
    }
});

// Basic security to discourage simple copying (Optional)
/*
document.addEventListener('contextmenu', (e) => {
    // e.preventDefault(); 
    // Not truly secure, but requested by some users to deter casual inspection
});
*/
