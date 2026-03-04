import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';

export type DiscoveryPageSize = 'sm' | 'md' | 'lg';

const MAX_WIDTHS: Record<DiscoveryPageSize, string> = {
  sm: '800px',
  md: '1040px',
  lg: '1240px',
};

export const DiscoveryPageLayout = styled.div<{ size?: DiscoveryPageSize }>`
  max-width: ${({ size = 'lg' }) => MAX_WIDTHS[size]};
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space800};
`;
