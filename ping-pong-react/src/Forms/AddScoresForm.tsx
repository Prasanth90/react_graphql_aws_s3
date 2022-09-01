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
    create(data.playerOne, data.playerTwo, data.winner).then(x => {
      onClose();
    });
  };
  const initialValues = {
    playerOne: {},
    playerTwo: {},
    winner: {},
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
              const hasValue = !!(values.playerOne && values.playerTwo && values.winner);
              return hasValue ? undefined : { Error: 'Error' };
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      name="playerOne"
                      label="Player One"
                      options={options}
                      getOptionValue={x => x.value}
                      getOptionLabel={(x: any) => x.name}
                      isOptionEqualToValue={(o, v) => o.value === v.value}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      name="playerTwo"
                      label="Player One"
                      options={options}
                      getOptionValue={x => x.value}
                      getOptionLabel={(x: any) => x.name}
                      isOptionEqualToValue={(o, v) => o.value === v.value}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      name="winner"
                      label="Winner"
                      options={options}
                      getOptionValue={x => x.value}
                      getOptionLabel={(x: any) => x.name}
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
            )}
          />
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
