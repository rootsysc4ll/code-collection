import "./Authentication.css"

export default function Authentication() {
    return (
        <div id="auth-page">
            <div id="auth-container">
                <div id="auth-top-text-container">
                    {/* This header swithes betweeen
                        Sign up ---> Sign in
                        according to the auth method state 
                    */}
                    <h1 id="auth-header">Sign up</h1>
                    <span className="auth-text">Create an account!</span>

                    {/* error message state for backend errors */}
                    <span className="auth-text error-message"></span>
                </div>

                <div id="auth-form">
                    <input id="auth-input" placeholder="Enter your email" type="text" />
                    <input id="auth-input" placeholder="Enter your password" type="text" />
                    <button id="submit-button">
                        Submit
                    </button>
                </div>

                <div id="dividing-line" />

                <div id="auth-bottom-text-container">
                    <span className="auth-text">Already have an account?</span>
                    <button id="auth-method-button">Sign in</button>
                </div>
            </div>
        </div>
    )
}