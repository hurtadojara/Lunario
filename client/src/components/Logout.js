import React from 'react';
import { GoogleLogout } from 'react-google-login'

const clientId = '503743076427-mpo7jp1srh6dt3dnqj6220sjv3cnvvap.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('logout made');
    };

    return (
        <div>
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;