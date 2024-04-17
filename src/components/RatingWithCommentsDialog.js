import React, { useState } from "react";
import { Rating } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogActions } from "@mui/material";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import RatingAPI from "src/services/RatingAPI";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from "lodash";
import { Stack } from "@mui/material";


export default function RatingWithCommentsDialog({ open, onClose, vendorId }) {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const userId = JSON.parse(localStorage.getItem("UserData")).id;

  const handleRatings = async () => {
    onClose();
    try {
      await RatingAPI.createVendorRating({
        ratingData: {
          receiver: vendorId,
          provider: userId,
          rating: value,
          comments: comment,
        },
      });
      onClose();
      setValue(0);
      toast.success("Rating Registered Successfully");
    } catch (error) {
      console.log("Rejected user error :", error);
      setValue(0);
    }
  };
 
  const handleComments = (e) => {
    setComment(e.target.value);
  };
  const handleClose=()=>{
setValue(0);
onClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ minHeight: 150 }}>
        <DialogContent sx={{textAlign:'center'}}>
          <Rating  size="large"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              if (newValue == null) {
                setValue(0);
              } else {
                setValue(newValue);
              }
            }}
          />
          <TextField
            autoFocus
            autoComplete={"off"}
            margin="dense"
            id="name"
            label="Comment"
            type="text"
            onChange={handleComments}
            fullWidth
            variant="standard"
            required={true}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" disabled={(comment==='')||(value===0)} onClick={handleRatings} >
            Submit
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
}
