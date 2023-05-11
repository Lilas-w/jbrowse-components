import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
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

function SortByFoodieSingleDlg(props: {
  model: { setSortedBy: Function }
  handleClose: () => void
}) {
  const { classes } = useStyles()
  const { model, handleClose } = props
  const [left1, setLeft1] = useState('')
  const [right1, setRight1] = useState('')
  const [probability1, setProbability1] = useState('')
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        Sort by single transcription factor binding site
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Set range</Typography>
        <Typography color="textSecondary">
          Set the transcription factor binding site range by entering left and
          right positions. Reads overlap the centerline will participate in
          sorting. 
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={left1}
            onChange={event => setLeft1(event.target.value)}
            label="left"
            placeholder="eg:28552922"
            inputProps={{
              'data-testid': 'sort-foodie-left1-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-left1"
          />
          <TextField
            value={right1}
            onChange={event => setRight1(event.target.value)}
            label="right"
            placeholder="eg:28552945"
            inputProps={{
              'data-testid': 'sort-foodie-right1-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-right1"
          />
        </Box>

        <Typography>Set convert ratio</Typography>
        <Typography color="textSecondary">
          Set convert ratio in the input range.
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={probability1}
            label="ratio"
            onChange={event => setProbability1(event.target.value)}
            placeholder="eg:0.7"
            inputProps={{
              'data-testid': 'sort-foodie-probability-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-probability"
          />
        </Box>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            autoFocus
            onClick={() => {
              model.setSortedBy(
                'single TF',
                '',
                Number(left1),
                Number(right1),
                0,
                0,
                Number(probability1),
                0
              )
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
export default observer(SortByFoodieSingleDlg)
