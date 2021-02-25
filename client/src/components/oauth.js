import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId = "503743076427-mpo7jp1srh6dt3dnqj6220sjv3cnvvap.apps.googleusercontent.com";

function Login() {
  const onSucess = (res) => {
    console.log('[Login success] currentUser:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={onSucess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{marginTop:'100px'}}
        isSignedIn={true}
        />
    </div>
  )
}

export default Login