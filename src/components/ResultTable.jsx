import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ResultTable = ({ data = [] }) => {
  const { theme } = useTheme();

  const cellStyle = {
    color: theme.textColor,
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  };

  return (
    <div className="table" style=
        {{ 
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem'
        }}>

      <TableContainer style={{
            maxWidth: '65rem',
            maxHeight: '400px', 
            overflowY: 'auto'
        }}>

        <Table style={{backgroundColor: theme.background, textAlign: 'center', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} style={cellStyle}>
                  No results available
                </TableCell>
              </TableRow>
            ) : (
              data.map((i, index) => (
                <TableRow key={index}>
                  <TableCell style={cellStyle}>{i.wpm}</TableCell>
                  <TableCell style={cellStyle}>{i.accuracy}</TableCell>
                  <TableCell style={cellStyle}>{i.characters}</TableCell>
                  <TableCell style={cellStyle}>
                    {i.timeStamp?.toDate?.().toLocaleString?.() || 'Invalid date'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResultTable;