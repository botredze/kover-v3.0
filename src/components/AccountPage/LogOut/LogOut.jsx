import React from 'react';
import styles from './LogOut.module.scss';
import { Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '180px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
    // location.reload();
  };

  return (
    <>
      <button className={styles.btnLogOut} onClick={handleOpen}>
        Выйти
      </button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <p style={{ textAlign: 'center', fontSize: '20px' }}>
                Вы действительно хотите выйти?
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '60px',
                  padding: '50px 0 15px 0',
                }}
              >
                <button
                  style={{ background: 'transparent', fontSize: '20px' }}
                  onClick={logOut}
                >
                  Да
                </button>
                <button
                  style={{ background: 'transparent', fontSize: '20px' }}
                  onClick={handleClose}
                >
                  Нет
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default LogOut;
