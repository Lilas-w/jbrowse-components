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

function SortByFoodieDlg(props: {
  model: { setSortedBy: Function }
  handleClose: () => void
}) {
  const { classes } = useStyles()
  const { model, handleClose } = props
  const [left1, setLeft1] = useState('')
  const [right1, setRight1] = useState('')
  const [left2, setLeft2] = useState('')
  const [right2, setRight2] = useState('')
  const [probability, setProbability] = useState('')
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
        <Typography>Set ranges</Typography>
        <Typography color="textSecondary">
          Set Transcription Factor Binding site range by entering left pos and
          right pos.
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
            label="left1"
            placeholder="Enter left pos of range1"
            inputProps={{
              'data-testid': 'sort-foodie-left1-input',
            }}
            // 还需要看是否是中心位置周边的pos
            autoComplete="off"
            data-testid="sort-foodie-left1"
          />
          <TextField
            value={right1}
            onChange={event => setRight1(event.target.value)}
            label="right1"
            placeholder="Enter right pos of range1"
            inputProps={{
              'data-testid': 'sort-foodie-right1-input',
            }}
            // 还需要看是否是中心位置周边的pos
            autoComplete="off"
            data-testid="sort-foodie-right1"
          />
          <TextField
            value={left2}
            onChange={event => setLeft2(event.target.value)}
            placeholder="Enter left pos of range2"
            label="left2"
            inputProps={{
              'data-testid': 'sort-foodie-left2-input',
            }}
            // 还需要看是否是中心位置周边的pos
            autoComplete="off"
            data-testid="sort-foodie-left2"
          />
          <TextField
            value={right2}
            onChange={event => setRight2(event.target.value)}
            label="right2"
            placeholder="Enter right pos of range2"
            inputProps={{
              'data-testid': 'sort-foodie-right2-input',
            }}
            // 还需要看是否是中心位置周边的pos
            autoComplete="off"
            data-testid="sort-foodie-right2"
          />
        </Box>

        <Typography>Set probability</Typography>
        <Typography color="textSecondary">
          Set the probability of C/G appearing in the input range (use decimal
          form, eg.0.5)
        </Typography>
        <TextField
          value={probability}
          onChange={event => setProbability(event.target.value)}
          placeholder="Enter probability of C/G"
          inputProps={{
            'data-testid': 'sort-foodie-probability-input',
          }}
          // 还需要看是否是中心位置周边的pos
          autoComplete="off"
          data-testid="sort-foodie-probability"
        />
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            autoFocus
            onClick={() => {
              model.setSortedBy(
                'Foodie sort',
                '',
                Number(left1),
                Number(right1),
                Number(left2),
                Number(right2),
                Number(probability),
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
export default observer(SortByFoodieDlg)
