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
  const [probability1, setProbability1] = useState('')
  const [probability2, setProbability2] = useState('')
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        Sort by transcription factor binding sites
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Set TF ranges</Typography>
        <Typography color="textSecondary">
          To specify the range of transcription factor (TF) binding sites,
          provide the left and right positions of two TFs. Make sure that the
          centerline falls between the two TF binding sites. Reads encompassing
          both TFs will be used for sorting. <br />
          You can review the sorting results in the feature details by clicking
          on any read within each cluster. There are four types of clusters:
          R11, R10, R01, R00. The "percentage" value represents the ratio of
          cluster_size to total_reads. "Total_reads" refers to the total number
          of reads that cover the two TFs you have specified.
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
            label="right1"
            placeholder="eg:28552945"
            inputProps={{
              'data-testid': 'sort-foodie-right1-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-right1"
          />
          <TextField
            value={left2}
            onChange={event => setLeft2(event.target.value)}
            placeholder="eg:28553002"
            label="left2"
            inputProps={{
              'data-testid': 'sort-foodie-left2-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-left2"
          />
          <TextField
            value={right2}
            onChange={event => setRight2(event.target.value)}
            label="right2"
            placeholder="eg:28553021"
            inputProps={{
              'data-testid': 'sort-foodie-right2-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-right2"
          />
        </Box>

        <Typography>Set conversion ratio</Typography>
        <Typography color="textSecondary">
          Specify the conversion ratio within the input TF range1 and TF range2.
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
            label="ratio1"
            onChange={event => setProbability1(event.target.value)}
            placeholder="eg:0.7"
            inputProps={{
              'data-testid': 'sort-foodie-probability-input',
            }}
            autoComplete="off"
            data-testid="sort-foodie-probability"
          />
          <TextField
            value={probability2}
            label="ratio2"
            onChange={event => setProbability2(event.target.value)}
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
                'co-binding TFs',
                'Co-binding TFs',
                Number(left1),
                Number(right1),
                Number(left2),
                Number(right2),
                Number(probability1),
                Number(probability2),
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
