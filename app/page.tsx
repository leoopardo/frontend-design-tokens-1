'use client';

import { dark, light } from '@leoopardo/design-tokens';
import { useThemeStore } from '@/stores/ThemeStore';
import { alpha } from '@mui/material/styles';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

type TokenValue =
  | string
  | number
  | boolean
  | null
  | TokenValue[]
  | { [key: string]: TokenValue };

const typographyVariants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body',
] as const;

const isRecord = (value: TokenValue): value is Record<string, TokenValue> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const flattenTokens = (
  value: TokenValue,
  prefix = '',
): Array<{ name: string; value: string }> => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      flattenTokens(item, `${prefix}[${index}]`),
    );
  }

  if (isRecord(value)) {
    return Object.entries(value).flatMap(([key, nested]) =>
      flattenTokens(nested, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [{ name: prefix, value: String(value) }];
};

export default function Home() {
  const { updateTheme, currentTheme } = useThemeStore();
  const tokens = currentTheme === 'light' ? light : dark;
  const allSections = Object.entries(tokens) as Array<[string, TokenValue]>;

  const handleSwitchTheme = () => {
    switch (currentTheme) {
      case 'dark':
        updateTheme('light');
        break;

      default:
        updateTheme('dark');
        break;
    }
  };

  return (
    <Paper
      sx={{
        minHeight: '100vh',
        width: '100%',
        borderRadius: 0,
        p: { xs: 2, md: 4 },
        background: `radial-gradient(circle at 0% 0%, ${alpha(tokens.accent.default, 0.22)} 0%, transparent 45%),
          radial-gradient(circle at 100% 20%, ${alpha(tokens.colors.teal[500], 0.2)} 0%, transparent 40%),
          ${tokens.bg.default}`,
      }}
    >
      <Stack spacing={3}>
        <Paper
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 4,
            bgcolor: alpha(tokens.bg.muted, 0.85),
            border: `1px solid ${alpha(tokens.fg.subtle, 0.25)}`,
            boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
          >
            <Stack spacing={0.5}>
              <Typography variant="h4">Design Tokens Explorer</Typography>
              <Typography variant="body1" color="text.secondary">
                "{currentTheme}" Theme.
              </Typography>
            </Stack>
            <Button variant="contained" onClick={handleSwitchTheme}>
              Switch theme
            </Button>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              xl: 'repeat(2, minmax(0, 1fr))',
            },
          }}
        >
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: alpha(tokens.bg.muted, 0.7),
            }}
          >
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Typography Preview
            </Typography>
            <Stack spacing={1.5}>
              {typographyVariants.map((variant) => {
                const style = tokens[variant] as Record<string, string>;
                return (
                  <Box
                    key={variant}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(tokens.bg.subtle, 0.45),
                      border: `1px solid ${alpha(tokens.fg.subtle, 0.22)}`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: style?.fontFamily,
                        fontWeight: style?.fontWeight,
                        fontSize: style?.fontSize,
                        lineHeight: style?.lineHeight,
                        letterSpacing: style?.letterSpacing,
                      }}
                    >
                      {variant.toUpperCase()} • The quick brown fox jumps over
                      the lazy dog
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5, lineBreak: 'anywhere' }}
                    >
                      {JSON.stringify(style)}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: alpha(tokens.bg.muted, 0.7),
            }}
          >
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Color Palette
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 1.25,
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              }}
            >
              {Object.entries({
                accent: tokens.accent,
                bg: tokens.bg,
                fg: tokens.fg,
                ...tokens.colors,
              }).map(([family, value]) => {
                const shades = isRecord(value) ? value : { base: value };
                return (
                  <Paper key={family} sx={{ p: 1.25, borderRadius: 2.5 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                      {family}
                    </Typography>
                    <Stack spacing={0.6}>
                      {Object.entries(shades).map(([shade, colorValue]) => (
                        <Stack
                          key={`${family}-${shade}`}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ minWidth: 0 }}
                        >
                          <Box
                            sx={{
                              width: 18,
                              height: 18,
                              borderRadius: 0.8,
                              bgcolor: colorValue,
                              border: `1px solid ${alpha(tokens.fg.default, 0.2)}`,
                              flexShrink: 0,
                            }}
                          />
                          <Typography variant="caption" sx={{ minWidth: 26 }}>
                            {shade}
                          </Typography>
                          <Typography
                            variant="caption"
                            noWrap
                            color="text.secondary"
                          >
                            {String(colorValue)}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Paper>
                );
              })}
            </Box>
          </Paper>
        </Box>

        <Paper
          sx={{ p: 2.5, borderRadius: 3, bgcolor: alpha(tokens.bg.muted, 0.7) }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            All Token Styles
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Listagem dinâmica de todas as seções retornadas por
            `@leoopardo/design-tokens`.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 1.5,
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
          >
            {allSections.map(([sectionName, sectionValue]) => {
              const flattened = flattenTokens(sectionValue, sectionName);
              return (
                <Paper
                  key={sectionName}
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: alpha(tokens.bg.subtle, 0.5),
                    border: `1px solid ${alpha(tokens.fg.subtle, 0.2)}`,
                  }}
                >
                  <Typography variant="h6">{sectionName}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Stack
                    spacing={0.65}
                    sx={{ maxHeight: 300, overflow: 'auto', pr: 0.5 }}
                  >
                    {flattened.map((token) => (
                      <Stack
                        key={token.name}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {token.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {token.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              );
            })}
          </Box>
        </Paper>
      </Stack>
    </Paper>
  );
}
