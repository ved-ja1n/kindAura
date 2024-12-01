document.addEventListener('DOMContentLoaded', () => {
    const supabaseUrl = 'https://czrlstmguoehznaordev.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cmxzdG1ndW9laHpuYW9yZGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NDQ2NTMsImV4cCI6MjA0ODAyMDY1M30.JO5wqNnblqmq8fg0AhK87CaACOmVqXVPbebQj6M7v_k';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


    


    document.getElementById('show-signup').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('signup-form').classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });




    document.querySelector('#login-form form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const button = this.querySelector('button[type="submit"]');

        try {
            button.disabled = true;
            button.textContent = 'Loading...';

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            console.log('Logged in successfully:', data);
            window.location.href = 'MainWeb.html';

        } catch (error) {
            console.error('Login error:', error.message);
            showError(error.message, 'login-form');
        } finally {
            button.disabled = false;
            button.textContent = 'Login';
        }
    });

    document.querySelector('#signup-form form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const button = this.querySelector('button[type="submit"]');

        try {
            button.disabled = true;
            button.textContent = 'Loading...';

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username
                    }
                }
            });

            if (authError) throw authError;

            alert('Please check your email for verification link');
            document.getElementById('show-login').click();

        } catch (error) {
            console.error('Signup error:', error.message);
            showError(error.message, 'signup-form');
        } finally {
            button.disabled = false;
            button.textContent = 'Sign Up';
        }
        
    });

    function showError(message, formId) {
        const form = document.getElementById(formId);

        let existingError = form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.querySelector('form').appendChild(errorDiv);
    }

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            window.location.href = 'MainWeb.html';
        }
    }

    checkUser();
});


