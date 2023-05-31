import '../styles/spinner.css'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

const SpinnerBtn = () => {
    return (
        <div className="spinner" aria-label="spinner-icon">
            <div className="spinner-circle"></div>
        </div>
    )
}

const BackdropCircular = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

const CircularIndeterminate = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '80vh',
            }}
        >
            <CircularProgress
                sx={{
                    margin: '0 auto',
                }}
            />
        </Box>
    )
}

export { CircularIndeterminate, BackdropCircular, SpinnerBtn }
