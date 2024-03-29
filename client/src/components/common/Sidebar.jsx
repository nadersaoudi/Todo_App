import { Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from 'react'
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import asset from "../../assets";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import boardApi from '../../api/boardApi'
import { setBoards } from '../../redux/features/boadSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value)
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const sidebarWidth = 250;
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
       
      } catch (err) {
        alert(err)
      }
    }
    getBoards()
  }, [dispatch])

  useEffect(() => {
    const activeItem = boards.findIndex(e => e.id === boardId)
    if (boards.lenght > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
  }, [boards, boardId, navigate])



  const onDragEnd = () => {

  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100%",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: asset.colors.secondary,
          color: "white",
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }}>
          <ListItem>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                Favourites
              </Typography>
            </Box>
          </ListItem>
        </Box>
        <Box sx={{ paddingTop: "10px" }}>
          <ListItem>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                Private
              </Typography>
              <IconButton>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Box>
          </ListItem>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  boards.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItemButton
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          selected={index === activeIndex}
                          component={Link}
                          to={`/boards/${item.id}`}
                          sx={{
                            pl: '20px',
                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                          }}
                        >
                          <Typography
                            variant='body2'
                            fontWeight='700'
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {item.icon} {item.title}
                          </Typography>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
