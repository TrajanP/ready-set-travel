//The Homepage will be the base of the application, it is not built out yet.

import React from 'react';
import NavbarMain from '../components/NavbarMain';
import Button from 'react-bootstrap/Button';

export const HomePage = () => {
    return (
        <div>
            <NavbarMain/>
            This is the Homepage <Button variant="primary" >Play</Button>
        </div>
    );


}

export default HomePage;