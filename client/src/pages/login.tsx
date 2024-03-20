import { useLogin } from '@refinedev/core';
import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CredentialResponse } from '../interfaces/google';

// Changed Google Client Id
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box
      style={{
        backgroundColor: '#F2F2F2', // Changed background color
      }}
    >
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          gap="36px"
          justifyContent="center"
          flexDirection="column"
        >
          {/* Updated title using Typography component */}
          <Typography
            variant="h5"
            align="center"
            style={{ marginBottom: '20px', color: '#000 ' }}
          >
            Car Rental Services
          </Typography>

          <GoogleButton />
        </Box>
      </Container>
    </Box>
  );
};
