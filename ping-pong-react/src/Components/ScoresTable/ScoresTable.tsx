import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ScoresAppBar } from '../../Bars/ScoresAppBar';
import * as React from 'react';
import { IPlayer } from '../../hooks/useGetPlayers';
import { AddScoresForm } from '../../Forms/AddScoresForm';
import { Button, LinearProgress, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { actionCreators } from '../../store/players/actions';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    sortable: false,
    filterable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    sortable: false,
    filterable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    flex: 1,
  },
  {
    field: 'wins',
    headerName: 'Wins',
    headerAlign: 'center',
    type: 'number',
    align: 'center',
    sortable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: 'losses',
    headerName: 'Losses',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    sortable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: 'matches',
    headerName: 'Matches',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    sortable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: 'rank',
    headerName: 'Rank',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    sortable: true,
    filterable: false,
    flex: 1,
  },
];

export const ScoresTable = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const allPlayers: IPlayer[] = useSelector((state: IApplicationState) => state.playersState.players);
  const loading: boolean = useSelector((state: IApplicationState) => state.playersState.isLoading);

  const dispatch: Dispatch<any> = useDispatch();
  const getAllPlayersWithRank = React.useCallback(() => dispatch(actionCreators.getAllPlayers()), [dispatch]);

  React.useEffect(() => {
    getAllPlayersWithRank();
  }, [getAllPlayersWithRank]);

  const rows = React.useMemo(() => {
    const players = [...allPlayers];
    players.sort((a, b) => b.wins - a.wins);
    return players.map((x, i) => {
      return {
        id: i,
        ...x,
        matches: x.wins + x.losses,
        rank: i + 1,
      };
    });
  }, [allPlayers]);

  return (
    <>
      <ScoresAppBar />
      <Paper style={{ margin: 24 }}>
        <div
          style={{
            height: 60,
            background: '#04224d',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
          <SportsScoreIcon style={{ color: 'white', marginLeft: 12 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 500,
              fontSize: 22,
              fontFamily: 'monospace',
              color: 'white',
            }}>
            Scores
          </Typography>
          <Button style={{ marginRight: 12 }} onClick={() => setIsOpen(true)} variant="contained">
            <AddIcon style={{ marginRight: 8 }} />
            ADD NEW RESULT
          </Button>
        </div>
        <div
          style={{
            height: 'calc(100vh - 172px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'rank', sort: 'asc' }],
              },
            }}
            components={{
              LoadingOverlay: LinearProgress,
            }}
            loading={loading}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <AddScoresForm
          players={allPlayers}
          onClose={() => {
            setIsOpen(false);
            getAllPlayersWithRank();
          }}
          open={isOpen}
        />
      </Paper>
    </>
  );
};
