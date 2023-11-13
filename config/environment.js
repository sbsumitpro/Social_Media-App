
const development = {
    name:"development",
    session_cookie_key:"blahSOme",
    db:"manual_authentication",
    smtp:{ 
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:"sbsumitpro@gmail.com",
            pass:"gqogwxfxrebncnad"
        }
    },
    jwt_secret :"CodeChef",
    google_client_id:"109833799268-6m8ncr2152bdpec9dbt7h7on6ibje8rq.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url:"http://localhost:7000/users/auth/google/callback"
}

const production = {
    name:"production"
}

module.exports = development