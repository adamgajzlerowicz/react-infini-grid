// @flow

import React from 'react';

const NothingToShow = () => (
    <div className="nothing-to-see" 
    style={{
        flex: 1,  
        textAlign: 'center',   
        display: 'flex', 
        justifyContent: 'space-around',
        flexDirection: 'column'}}
    >
        There is nothing to see here
    </div>
    );
    
    export {
        NothingToShow, NothingToShow as default,
    };
    