import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message, isBot }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: '80%',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: isBot ? 'grey.100' : 'primary.main',
                    color: isBot ? 'text.primary' : 'primary.contrastText',
                    borderTopLeftRadius: isBot ? 0 : 8,
                    borderTopRightRadius: isBot ? 8 : 0,
                    '& p': {
                        m: 0,
                    },
                    '& a': {
                        color: isBot ? 'primary.main' : 'inherit',
                    }
                }}
            >
                <Typography variant="body2" component="div">
                    <ReactMarkdown>{message}</ReactMarkdown>
                </Typography>
            </Box>
        </Box>
    );
}
