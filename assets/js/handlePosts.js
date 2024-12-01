document.addEventListener('DOMContentLoaded', () => {
    const SUPABASE_URL = 'https://slbgyfzrqdzaarzaxeqn.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYmd5ZnpycWR6YWFyemF4ZXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0Mjg2OTksImV4cCI6MjA0ODAwNDY5OX0.yvXKN_q5ZaK0V5nqQdFcuZy6KbjZIN8n6s4cIvqFANA';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    let posts = [];
    let currentCardIndex = 0;
    const createButton = document.getElementById('create-button');
    const createPostModal = document.getElementById('create-post-modal');
    const createPostForm = document.getElementById('create-post-form');
    const cardsContainer = document.createElement('div');
    const cardWrapper = document.createElement('div');

    async function fetchPostsFromSupabase() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching posts:', error);
                return [];
            }
            cardWrapper.innerHTML = '';
            posts = [];
            data.forEach(post => {
                const cardHTML = `
                    <div class="card" data-post-id="${post.id}">
                        <div class="header">
                            <div class="profile">
                                <div class="username">@${post.username}</div>
                            </div>
                        </div>
                        <div class="sub-card">
                            <div class="content">${post.content}</div>
                            <img class="post-image" src="${post.imageurl}">
                            <div class="actions">
                                <div class="comment">
                                    <img src="assets/images/Comment Icon.svg" class="comment-icon">
                                    <input type="text" placeholder="Add and read comments" class="comment-button" readonly>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-heart heart-icon"></i>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                `;
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = cardHTML;
                const newCard = tempContainer.firstElementChild;
                setupCardEventListeners(newCard);
                cardWrapper.appendChild(newCard);
                posts.push({
                    id: post.id,
                    element: newCard
                });
            });
            updateCardDisplay();
        } catch (error) {
            console.error('Error in fetchPostsFromSupabase:', error);
        }
    }

    function setupNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                navigateCards('prev');
            } else if (e.key === 'ArrowRight') {
                navigateCards('next');
            }
        });
        let touchStartX = 0;
        let touchEndX = 0;
        cardsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        cardsContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        function handleSwipe() {
            const swipeThreshold = 50;
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    navigateCards('next');
                } else {
                    navigateCards('prev');
                }
            }
        }
    }

    function navigateCards(direction) {
        if (posts.length === 0) return;
        if (direction === 'next') {
            currentCardIndex = (currentCardIndex + 1) % posts.length;
        } else {
            currentCardIndex = (currentCardIndex - 1 + posts.length) % posts.length;
        }
        updateCardDisplay();
    }

    function updateCardDisplay() {
        const translateX = -currentCardIndex * 100;
        cardWrapper.style.transform = `translateX(${translateX}%)`;
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        if (prevButton && nextButton) {
            prevButton.style.opacity = currentCardIndex === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentCardIndex === posts.length - 1 ? '0.5' : '1';
        }
        updateCardCounter();
    }

    function updateCardCounter() {
        let counter = document.querySelector('.card-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'nav-button';
            counter.id = 'card-counter';
            cardsContainer.appendChild(counter);
        }
        counter.textContent = `${currentCardIndex + 1} / ${posts.length}`;
    }

    function setupCardEventListeners(card) {
        const heartIcon = card.querySelector('.heart-icon');
        const commentButton = card.querySelector('.comment-button');
        const postId = card.dataset.postId;
        if (heartIcon) {
            heartIcon.addEventListener('click', () => {
                heartIcon.classList.toggle('liked');
            });
        }
        if (commentButton) {
            commentButton.addEventListener('click', () => {
                const commentModal = document.getElementById('comment-modal');
                if (commentModal) {
                    commentModal.style.display = 'block';
                }
            });
        }
    }

    async function createNewPost(username, content, imageurl) {
        try {
            const postId = Date.now();
            const { data, error } = await supabase
                .from('posts')
                .insert([{ 
                    id: postId, 
                    username, 
                    content, 
                    imageurl, 
                    created_at: new Date(), 
                    likes: 0 
                }]);
            if (error) throw error;
            await fetchPostsFromSupabase();
            updateCardDisplay();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    function initializePage() {
        cardsContainer.className = 'cards-container';
        cardWrapper.className = 'card-wrapper';
        cardsContainer.appendChild(cardWrapper);
        document.body.insertBefore(cardsContainer, document.querySelector('footer'));
        const existingCard = document.querySelector('.card');
        if (existingCard) {
            cardWrapper.appendChild(existingCard);
            posts.push({
                id: Date.now(),
                element: existingCard
            });
        }
        fetchPostsFromSupabase();
        setupNavigation();
        setupEventListeners();
    }

    function setupEventListeners() {
        createButton?.addEventListener('click', () => {
            createPostModal.style.display = 'block';
        });
        createPostForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('post-username').value;
            const content = document.getElementById('post-content').value;
            const imageurl = document.getElementById('post-image').value;
            await createNewPost(username, content, imageurl);
            createPostForm.reset();
            createPostModal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === createPostModal) {
                createPostModal.style.display = 'none';
            }
        });
    }

    initializePage();
});
