document.addEventListener('DOMContentLoaded', function() {
    const videoBtns = document.querySelectorAll('.watch-video-btn');
    
    // Check and show buttons that have a video ID
    videoBtns.forEach(btn => {
        const videoId = btn.getAttribute('data-video-id');
        if (videoId && videoId.trim() !== "") {
            btn.style.display = 'flex'; // Button ko show karo
        }
        
        // Click event add karo popup open karne ke liye
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if(videoId && videoId.trim() !== "") {
                openVideoPopup(videoId.trim());
            }
        });
    });
});

function openVideoPopup(videoId) {
    // Create Overlay Container
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.85)';
    overlay.style.zIndex = '999999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    
    // Create Close Button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '30px';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.color = 'white';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    
    // Create YouTube iFrame
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.style.width = '90%';
    iframe.style.maxWidth = '800px';
    iframe.style.aspectRatio = '16/9';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '10px';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
    
    // Append elements
    overlay.appendChild(closeBtn);
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
    
    // Smooth fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
    
    // Close Logic
    const closePopup = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            closePopup();
        }
    });
}