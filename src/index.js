import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://mprtwhngftpzfduaxpbi.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wcnR3aG5nZnRwemZkdWF4cGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1OTkxNzMsImV4cCI6MjAxNDE3NTE3M30.dQaxxUbK5M_cb1ZVwNprju_AMpRdjrLQBNN7Kb0kbEQ');


const userEmail = document.querySelector("#em");
const userPass = document.querySelector("#pass");
const signInButton = document.querySelector("#signIn");
const createAccountButton = document.querySelector("#create");
const signOutButton = document.querySelector("#signOut");

const signInUser = async () => {
    const em = userEmail.value;
    const pass = userPass.value;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: em,
        password: pass,
    }).then((userCred) => {
        alert("Sign in successful!");
    }
    ).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

const createUser = async () => {
    const em = userEmail.value;
    const pass = userPass.value;
    const { data, error } = await supabase.auth.signUp({
        email: em,
        password: pass,
    }).then((userCred) => {

        alert("Account Creation Successful!")
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}
const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
}

const uponSignInOut = async () => {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN') {
            console.log('SIGNED_IN', session);
        }
        else if (event == "SIGNED_OUT") {
            console.log("Ech", session);

        }
    })
};



document.addEventListener(signInButton, signInUser);
document.addEventListener(createAccountButton, createUser);
document.addEventListener(signOutButton, signOutUser);


