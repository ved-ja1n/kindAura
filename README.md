# kindAura: Join the World Where Everyone is Kind and Happy

## Overview
kindAura is an online platform which aims at creating awareness of positive attitude and thankfulness. It is a platform which is based on the idea that telling people positive stories and encouraging them to be kind can make a positive change in the society. This is a place where people gather to enjoy the positive aspects of life, share kindness and join a positive environment. kindAura's mission is clear: to culture inspire where people gratitude to leads appreciate to the meaningful beauty action. in everyday life.

# **Features**
### **Gratitude Sharing**
- Write about some good things you that in have your happened day. to

### **Acts of Kindness**
- Share and share deserve of good deeds you have done or you have seen being done.

### **Positive Vibes Only**
- Be part of a positive environment that is full of motivation and positive affirmations.

### **Editor's Picks**
- Explore unique and interesting content selection of the community's best contributions. ---
## **Project Overview**

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
| **`/assets/js/instructions.js`** | Contains the js code for instructions popup. |
| **`/assets/js/loginSignup.js`** | Contains the js code required for login and signup functionality. |


---

## **How to Use**

### Dependencies
- Web Browser (latest version of Chrome, Firefox, or Safari)
- Internet Connection

### **Method 1: Access the Prebuilt Website**
1. **Visit the Website**: Navigate to [**kindAura**](https://kind-aura.netlify.app/homepage) **(deprecated)**
2. **Sign Up**: Click on the sign-up button to create a new account. You will need an email ID.
3. **Explore**: Once registered, explore the existing posts and feel free to engage with the community.
4. kindAura will automatically log you back in when you revisit the website.
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
## **Deploying the Project**
After setting up Supabase:
- Deploy the front-end code using any web hosting platform (e.g., Netlify, Vercel).
- Ensure your Supabase API keys and database settings are configured correctly for live deployment.

---

## **Privacy Concerns**

- This project uses Supabase, which gives administrators full access to all data stored in the database. This includes:
  - The ability to view all registered email addresses of users.
  - Full control over every post, including the ability to edit usernames, content, images, and other post details.
- We are not liable for any posts created in the website due to inactive moderation of posts.

---
## **License**
- kindAura is licensed under the [**MIT License**](https://opensource.org/license/MIT). Feel free to use and modify this project, but please give credit.

---
## **Contributors**

A big shoutout to everyone who made kindAura possible!

| Contributor | Role | Contribution Highlights |
|-|-|-|
| **Vedant Jain** | Frontend & Backend Developer | Built the frontend and handled posts creation. |
| **Saksham** | Backend Developer | Handled authentication, Supabase integration, and other JS code. |
| **Palak Bhatt** | Documentation | Crafted this `README.md` |
| **Shiv Pandey** | Designer | Created SVGs and provided design resources for this project. |
