import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function BackDropLoader({ isLoading = false }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            {isLoading && <CircularProgress color="inherit" />}
        </Backdrop>
    )
}

export default BackDropLoader
