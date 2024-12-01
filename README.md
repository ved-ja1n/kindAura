# **kindAura**: Spread Kindness, Share Joy

## 🖥️ Overview
kindAura is a web-based platform built to ignite a movement of gratitude and positivity. It’s more than a space—it’s a vision driven by the belief that sharing uplifting stories and celebrating acts of kindness can create a ripple effect of change. Here, users come together to reflect on the good in their lives, champion kindness, and connect in a community rooted in support and encouragement. The mission of kindAura is simple yet powerful: to inspire individuals to see the beauty in the everyday, embrace the extraordinary in others, and foster a culture where appreciation sparks action.

## Description
kindAura is a digital sanctuary where individuals come together to celebrate the transformative power of kindness and gratitude. It’s not just a platform—it’s a bold movement born from the belief that small, authentic moments of connection can ignite profound change. Here, users share heartfelt stories of joy, amplify acts of kindness they’ve witnessed, and build meaningful connections through genuine interactions. This is more than just a space for posts; it’s a catalyst for positivity, inspiring users to create ripples of kindness in their everyday lives. With an intuitive interface and a focus on community, kindAura is where inspiration meets action.



---

## 🚀 **Features**

### 🌟 **Gratitude Sharing**
- Post personal moments that brightened your day.

### 🤝 **Acts of Kindness**
- Celebrate and amplify acts of kindness you’ve witnessed or participated in.

### 💬 **Positive Vibes Only**
- Engage in a supportive community through encouraging and motivational words.

### 📝 **Editor's Picks**
- Discover handpicked highlights featuring inspiring and creative community moments.

---

## 🖥️ **Project Overview**

kindAura is built using **HTML**, **CSS**, and **JavaScript**, with backend support provided by **Supabase** for data storage and authentication and **Netlify** for hosting. The codebase is structured for simplicity and ease of use:

| **HTML File** | **Description** |
|-|-|
| **`HomePage.html`** | Landing page welcoming users to kindAura. |
| **`LoginSignup.html`** | Handles user authentication (login/sign-up) for personalized experiences. |
| **`MainWeb.html`** | This is where users can see each other's posts and post stuff. |


| **CSS File** | **Description** |
|-|-|
| **`/assets/css/common.css`** | Contains styles and layouts common for the different pages. |
| **`/assets/css/homepage.css`** | Contains styles and layouts specific for ```HomePage.html``` |
| **`/assets/css/login-signup.css`** | Contains styles and layouts specific for ```LoginSignup.html``` |
| **`/assets/css/main-web.css`** | Contains styles and layouts specific for ```MainWeb.html``` |

| **JS File** | **Description** |
|-|-|
| **`/assets/js/comments.js`** | Contains the js code required for comments functionality. |
| **`/assets/js/handlePosts.js`** | Contains the js code required for creating and displaying posts. |
| **`/assets/js/instructions.js`** | Contains the js code required for the notification telling users how to navigate posts. |
| **`/assets/js/loginSignup.js`** | Contains the js code required for login and signup functionality. |


---

## 📋 **How to Use**

### 🖥️ Dependencies
- Web Browser (latest version of Chrome, Firefox, or Safari)
- Internet Connection

### **Method 1: Access the Prebuilt Website**
1. **Visit the Website**: Navigate to [**kindAura**](https://kind-aura.netlify.app/homepage)
2. **Sign Up**: Click on the sign-up button to create a new account. You will need a valid email address and a password.
3. **Explore**: Once registered, explore the existing posts and feel free to engage with the community.
---

### **Method 2: Build Your Own Instance**

Follow these steps to set up and run kindAura locally:

#### 1. Clone the Repository
Run the following command in your terminal to clone the project:
```bash
git clone https://github.com/your-username/kindaura.git
```

#### 2. Navigate to the Project Directory
Run the following command in your terminal to clone the project:
```bash
cd kindaura
```

### 3. Set Up Your Backend with Supabase
kindAura uses Supabase to manage posts and user data. Follow these steps:
#### 1. Replace Supabase Placeholders:
Open the ```assets/js/handlePosts.js``` and replace const ```SUPABASE_URL```'s value with your Supabase Url and const ```SUPABASE_KEY```'s value with your Supabase key.
#### 2. Create the posts Table:
In your supabase project, open SQL Editor and run the following code:
```sql
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,     
    username TEXT NOT NULL,     
    content TEXT NOT NULL,       
    imageurl TEXT,                  
    created_at TIMESTAMPTZ DEFAULT now(),
    likes INT DEFAULT 0               
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
ON posts
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous reads"
ON posts
FOR SELECT
TO anon
USING (true);
```
This code will create the posts table for you and enable RLS

#### 3. Replace Supabase Placeholders:
Open the ```assets/js/loginSignup.js``` and replace const ```supabaseUrl```'s value with your Supabase Url and const ```supabaseKey```'s value with your Supabase key.
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, username, email, created_at, updated_at)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'username', new.email), -- fallback to email if no username
        new.email,
        now(),
        now()
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.pro  files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);
```

---
## 🌐 **Deploying the Project**
After setting up Supabase:
- Deploy the front-end code using any web hosting platform (e.g., Netlify, Vercel).
- Ensure your Supabase API keys and database settings are configured correctly for live deployment.

---

## 🚫 **Privacy Concerns**

- This project uses Supabase, which gives administrators full access to all data stored in the database. This includes:
  - The ability to view all registered email addresses of users.
  - Full control over every post, including the ability to edit usernames, content, images, and other post details.
- We are not liable for any posts created in the website due to inactive moderation of posts.

---
## 📄 **License**
- kindAura is licensed under the [**MIT License**](https://opensource.org/license/MIT). Feel free to use and modify this project, but please give credit.

---
## 🤝 **Contributors**

A big shoutout to everyone who made kindAura possible! 🎉

| Contributor | Role | Contribution Highlights |
|-|-|-|
| **Vedant Jain** | Frontend & Backend Developer | Built the frontend and handled posts creation. |
| **Saksham** | Backend Developer | Handled authentication, Supabase integration, and other JS code. |
| **Palak Bhatt** | Documentation | Crafted this `README.md` |
| **Shiv Pandey** | Designer | Created SVGs and provided design resources for this project. |
