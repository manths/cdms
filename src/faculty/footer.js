import React from 'react';

const Footer =()=>{
    const style={
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        height:'50px'
    }
    return(
          <div style={style} className='bg-dark text-white'>
              © Copyright <span className='span text-primary'> Developer</span> 
          </div>  
    )
}
export default Footer;
