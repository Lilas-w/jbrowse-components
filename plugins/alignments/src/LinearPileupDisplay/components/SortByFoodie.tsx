import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'

import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles()(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

function SortByFoodieDlg(props: {
  model: { setSortedBy: Function }
  handleClose: () => void
}) {
  const { classes } = useStyles()
  const { model, handleClose } = props
  const [left1, setLeft1] = useState('')
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        Sort by Transcription Factor Binding Sites
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Set ranges and probability</Typography>
        <Typography color="textSecondary">
          Set left1 and right1 for site Range1, set Range2 in the same way. Set
          the probability of C/G base pair (blue) to Probability (reserve one
          decimal, such as 0.5)
        </Typography>
        <TextField
          value={left1}
          onChange={event => setLeft1(event.target.value)}
          placeholder="Enter left pos of range1"
          inputProps={{
            'data-testid': 'sort-foodie-left1-input',
          }}
          // 还需要看是否是中心位置周边的pos
          error={!Number.isFinite(left1)}
          helperText={!Number.isFinite(left1) ? 'Not a valid number' : ''}
          autoComplete="off"
          data-testid="sort-foodie-left1"
        />
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            autoFocus
            onClick={() => {
              //   model.setSortedBy('tag', tag)
              handleClose()
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
export default observer(SortByFoodieDlg)
