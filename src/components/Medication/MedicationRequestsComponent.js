import React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';
import TableStyles from '../common/Styles/Table.style';
import MedicationPriority from './MedicationPriority';
import MedicationNote from './MedicationNote';
import MedicationDose from './MedicationDose';


const getMedicationDate = (mr) => {
  if(mr.authoredOn){
    return formatDateString(mr.authoredOn);
  }
  else if (mr.dosageInstruction[0].timing?.event && mr.dosageInstruction[0].timing?.event[0]) {
    return formatDateString(mr.dosageInstruction[0].timing.event[0]);
  }
  else if (mr.dosageInstruction[0].timing?.repeat?.boundsPeriod?.start) {
    return formatDateString(mr.dosageInstruction[0].timing.repeat.boundsPeriod.start);
  }
  else
    return '';
}
const displayCodeableConcept = (codeableConcept, defaultText) => {
  if (codeableConcept?.targetResource?.code?.text){
    return codeableConcept?.targetResource?.code?.text;
  }
  const ext = codeableConcept?.targetResource?.extension && codeableConcept?.targetResource?.extension[0];
  if (ext?.extension[0]) {
    return ext.extension[0].valueString;
  }
  return defaultText;
};

const findMedicationName = (mr) => {
  if (mr.medicationReference){
    return mr.medicationReference.display ? mr.medicationReference.display : displayCodeableConcept(mr.medicationReference,'Unspecified');
  }
  if (mr.medicationCodeableConcept){
    return mr.medicationCodeableConcept.text ? mr.medicationCodeableConcept.text : displayCodeableConcept(mr.medicationCodeableConcept,'Unspecified');
  }
};

  
const MedicationReason = ({reasons, reasonCodes}) => {
  if (reasons) {
    return (
      <li>
        Reasons:&nbsp;
        <span>
          {reasons.map((ref) => displayCodeableConcept(ref.targetResource.code, '')).reduce((acc, value) => `${acc}, ${value}`)}
        </span>
      </li>
    );
  }

  if (reasonCodes) {
    return (
      <li>
        Reasons:&nbsp;
        <span>
          {reasonCodes.map((code) => displayCodeableConcept(code, '')).reduce((acc, value) => `${acc}, ${value}`)}
        </span>
      </li>
    );
  }
  return null;
};

// eslint-disable-next-line max-len
const MedicationRequestsComponent = ({ medicationRequests }) => (medicationRequests && medicationRequests.length > 0 ? (
  <TableStyles>
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            <TableCell className="header" colSpan={4}>
              Medication:
            </TableCell>
          </TableRow>
          <TableRow className="table-head">
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Medication</TableCell>
            <TableCell align="left">Dosing Instruction</TableCell>
            <TableCell align="left">Additional Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicationRequests.map((mr, index) => (
            <TableRow key={index}>
              <TableCell className="table-cell">
                {getMedicationDate(mr)}               
              </TableCell>
              <TableCell className="table-cell">
                {findMedicationName(mr)}
                {` (${mr.status})`}
                <ul className="mediation-list-item">
                  <MedicationReason reasons={mr.reasonReference} reasonCodes={mr.reasonCode} />
                </ul>
              </TableCell>
              <TableCell className="table-cell">
                <MedicationDose dosageInstructions={mr.dosageInstruction} />
              </TableCell>
              <TableCell className="table-cell">
                <ul className="mediation-list-item">
                  {<MedicationPriority mr={mr} />}
                  {<MedicationNote mr={mr} />}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </TableStyles>
) : (
  <div />
));

const medicationRequestShape = {
  status: PropTypes.string,
  authoredOn: PropTypes.string,
  dosageInstruction: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  medicationReference: PropTypes.shape({
    targetResource: PropTypes.shape({
      code: PropTypes.shape({
        coding: PropTypes.arrayOf(PropTypes.shape({
          code: PropTypes.string,
          display: PropTypes.string,
        })),
      }),
    }),
  }),
};

MedicationRequestsComponent.propTypes = {
  medicationRequests: PropTypes.arrayOf(PropTypes.shape(medicationRequestShape)),
};

MedicationRequestsComponent.defaultProps = {
  medicationRequests: [],
};

export default MedicationRequestsComponent;
