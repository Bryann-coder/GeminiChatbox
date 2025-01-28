import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "./AlertDialogSlide.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    title,
    evaluationData,
    handleScore
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    handleScore();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} className='bouton'>
        {title}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Évaluation détaillée</DialogTitle>
        <DialogContent className='pop-up-content'>
          <div className="evaluation-grid">
            <h2 className="score-global">Score Global: {evaluationData.globalScore}/100</h2>
            <div className="criteria-list">
              <div className="criteria-item">
                <span>Pertinence des réponses :</span>
                <span>{evaluationData.pertinence}/5</span>
              </div>
              <div className="criteria-item">
                <span>Précision scientifique :</span>
                <span>{evaluationData.precision}/5</span>
              </div>
              <div className="criteria-item">
                <span>Clarté et concision :</span>
                <span>{evaluationData.clarte}/5</span>
              </div>
              <div className="criteria-item">
                <span>Empathie :</span>
                <span>{evaluationData.empathie}/5</span>
              </div>
              <div className="criteria-item">
                <span>Temps de réponse :</span>
                <span>{evaluationData.tempsReponse}/5</span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}