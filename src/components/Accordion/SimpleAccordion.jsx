import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useSettingsStore, { getFaqList } from '../../app/stores/others/settingsStore';
import { useTranslation } from 'react-i18next';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid #B2B2B2`,
  borderTop: `1px solid #B2B2B2`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : '',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(-2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '10px 0px 10px 0px',
  borderTop: '1px solid #B2B2B2',
  margin: 0
}));


export default function SimpleAccordion() {

  const { faqList } = useSettingsStore();

  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  React.useEffect(() => {
    fetchFaq()
  }, [])

  const fetchFaq = async () => {
    await getFaqList()
  }

  return (
    <div>

      {faqList?.length > 0 ?
        faqList.map((item) => (
          <Accordion expanded={expanded === item?.id} onChange={handleChange(item?.id)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography style={{ fontSize: "16px", color: '#0E1826', fontWeight: '500' }} >{item?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize: "14px", color: '#595959', fontWeight: '400' }} >
                {item.description}
              </Typography>
            </AccordionDetails>
          </Accordion>

        )) : <span>{t('No FAQ Available')}</span> 
      }
    </div>
  );
}