import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function BackDropLoader({ apiStatus = '' }) {
    
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={apiStatus === 'loading'}
            >       
            {apiStatus === 'loading' && <CircularProgress color="inherit" />}
        </Backdrop>

    )
}


export default BackDropLoader

