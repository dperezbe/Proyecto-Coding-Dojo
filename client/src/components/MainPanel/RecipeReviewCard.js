import React,{useEffect} from 'react'; 
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BasicModal from './BasicModal';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({AppName,updatedAt,AppDescription,AppId}) {
  const [expanded, setExpanded] = React.useState(false);
  const [notiApp, setNotiApp] = React.useState([]);
  const handleExpandClick = () => {
    axios
      .get(`/api/notiapp/${AppId}`)
      .then((response) => {
        setNotiApp(response.data.notification);
      })
      .catch((e) => console.log(e));
    setExpanded(!expanded);
  };



  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={AppName}
        subheader={updatedAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {AppDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <BasicModal 
          AppId = {AppId}
          AppName = {AppName}
        />
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {notiApp.length >0 ? notiApp.map((t) => 
                    <Typography paragraph key={t._id}><b>{t.createdAt}</b> {t.Message}</Typography>      )    
          :<p>Aplicación sin notificaciones</p> }
         
        </CardContent>
      </Collapse>
    </Card>
  );
}