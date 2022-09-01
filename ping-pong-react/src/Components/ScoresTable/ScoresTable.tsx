import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ScoresAppBar } from '../../Bars/ScoresAppBar';
import * as React from 'react';
import { useGetPlayers } from '../../hooks/useGetPlayers';
import { AddScoresForm } from '../../Forms/AddScoresForm';
import { LinearProgress } from '@mui/material';

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
  const { getPlayers, data, loading } = useGetPlayers();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    getPlayers();
  }, []);

  const rows = React.useMemo(() => {
    const players = [...data];
    players.sort((a, b) => b.wins - a.wins);
    return players.map((x, i) => {
      return {
        id: i,
        ...x,
        matches: x.wins + x.losses,
        rank: i + 1,
      };
    });
  }, [data]);

  return (
    <>
      <ScoresAppBar onAddScoreClicked={() => setIsOpen(true)} />
      <div
        style={{
          height: 'calc(100vh - 65px)',
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
        players={data}
        onClose={() => {
          setIsOpen(false);
          getPlayers();
        }}
        open={isOpen}
      />
    </>
  );
};
