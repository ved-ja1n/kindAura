document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('instructions-modal');

    window.onload = () => {
        modal.style.display = "block";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
