import { Box } from '@mui/material';

export default function TypingIndicator() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: '80%',
                    p: 1.5,
                    px: 2,
                    borderRadius: 2,
                    bgcolor: 'grey.100',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    height: 48,
                }}
            >
                {[0, 1, 2].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'grey.500',
                            borderRadius: '50%',
                            animation: `typing-bounce 1.4s infinite ease-in-out both`,
                            animationDelay: `${i * 0.16}s`,
                            '@keyframes typing-bounce': {
                                '0%, 80%, 100%': { transform: 'scale(0.5)', opacity: 0.5 },
                                '40%': { transform: 'scale(1)', opacity: 1 },
                            },
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
