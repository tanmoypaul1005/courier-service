import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
/*  */import Typography from '@mui/material/Typography';
import React from 'react';

const CommonAccordion = ({ title, description, expanded, onExpanded }) => {
  return (
    <Accordion disableGutters sx={{backgroundColor:"#ffffff", boxShadow: 'none', borderTop:'1px solid #B2B2B2'}} expanded={expanded} onChange={onExpanded} >
      <AccordionSummary sx={{border:'none'}} aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />}>
        <Typography style={{ fontSize: "16px", color: '#0E1826', fontWeight: '500' }} >{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography style={{ fontSize: "14px", color: '#595959', fontWeight: '400' }} >
          {description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CommonAccordion;