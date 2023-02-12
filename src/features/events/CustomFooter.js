import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    selectedGridRowsCountSelector,
} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Grid from '@mui/material/Grid'

function CustomFooterComponent({ setDialogIsOpen }) {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    const selectedCount = useGridSelector(apiRef, selectedGridRowsCountSelector)

    return (
        <Box sx={{ p: 1 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {
                    <Box sx={{ width: 150, p: 0 }}>
                        {selectedCount > 0
                            ? `${selectedCount} events selected`
                            : ''}
                    </Box>
                }
                <Button
                    variant="contained"
                    onClick={() => setDialogIsOpen(true)}
                    disabled={selectedCount === 0}
                >
                    Delete
                </Button>
                <Pagination
                    color="primary"
                    count={pageCount}
                    page={page + 1}
                    onChange={(event, value) =>
                        apiRef.current.setPage(value - 1)
                    }
                />
            </Grid>
        </Box>
    )
}

export default CustomFooterComponent
