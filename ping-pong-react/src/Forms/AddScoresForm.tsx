import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import { Autocomplete } from 'mui-rff';
import { Form } from 'react-final-form';
import { IPlayer } from '../hooks/useGetPlayers';
import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { useCreateScore } from '../hooks/useCreateScore';

export interface IFormProps {
  onClose: () => void;
  open: boolean;
  players: IPlayer[];
}

export const AddScoresForm: React.FC<IFormProps> = ({ onClose, open, players }) => {
  const { create, loading } = useCreateScore();

  const onSubmit = (data: any) => {
    if (data.playerOne && data.playerTwo && data.winner) {
      create(data.playerOne, data.playerTwo, data.winner).then(x => {
        onClose();
      });
    } else {
      onClose();
    }
  };
  const initialValues = {
    playerOne: null,
    playerTwo: null,
    winner: null,
  };

  const options = React.useMemo(() => {
    return players.map(x => {
      return {
        name: x.firstName,
        value: x.playerId,
      };
    });
  }, [players]);

  return (
    <Dialog onClose={onClose} open={open} style={{ height: 600 }}>
      <Paper style={{ minWidth: 400 }}>
        <DialogTitle>Add New Result</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={values => {
              const errors: any = {};
              if (!values.playerOne) {
                errors.playerOne = 'Required';
              }
              if (!values.playerTwo) {
                errors.playerTwo = 'Required';
              }
              if (!values.winner) {
                errors.winner = 'Required';
              }
              return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => {
              console.log(values, options, 'Current Values');
              return (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <Autocomplete
                        name="playerOne"
                        label="Player One"
                        options={options}
                        getOptionValue={x => x.value}
                        getOptionLabel={(x: any) => x.name}
                        required
                        isOptionEqualToValue={(o, v) => o.value === v.value}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        name="playerTwo"
                        label="Player Two"
                        options={options.filter(x => x?.value !== values?.playerOne)}
                        getOptionValue={x => x.value}
                        getOptionLabel={(x: any) => x.name}
                        required
                        isOptionEqualToValue={(o, v) => o.value === v.value}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        name="winner"
                        label="Winner"
                        options={options.filter(x => x.value === values.playerOne || x.value === values.playerTwo)}
                        getOptionValue={x => x.value}
                        getOptionLabel={(x: any) => x.name}
                        required
                        isOptionEqualToValue={(o, v) => o.value === v.value}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions style={{ marginTop: 24 }}>
                    <Button variant="outlined" onClick={onClose}>
                      Cancel
                    </Button>
                    <LoadingButton
                      type="submit"
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<AddIcon />}
                      variant="contained">
                      Create
                    </LoadingButton>
                  </DialogActions>
                </form>
              );
            }}
          />
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
