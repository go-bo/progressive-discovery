import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import { CapabilityItem } from '@/spec/components/CapabilityItem/CapabilityItem';

// ── Types ───────────────────────────────────────────────

export interface ValuePropsGridItem {
  icon: string;
  title: string;
  description: string;
}

export interface ValuePropsGridProps {
  title: string;
  subtitle?: string;
  items: ValuePropsGridItem[];
  columns?: 2 | 3;
  iconVariant?: 'neutral' | 'accent' | 'warm';
}

// ── Styles ───────────────────────────────────────────────

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const SectionTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const SectionSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const Grid = styled.div<{ columns: 2 | 3 }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const GridItem = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space400};
`;

// ── Component ────────────────────────────────────────────

export const ValuePropsGrid: React.FC<ValuePropsGridProps> = ({
  title,
  subtitle,
  items,
  columns = 2,
  iconVariant = 'warm',
}) => {
  const { theme } = usePebbleTheme();

  return (
    <div>
      <SectionHeader theme={theme}>
        <SectionTitle theme={theme}>{title}</SectionTitle>
        {subtitle && <SectionSubtitle theme={theme}>{subtitle}</SectionSubtitle>}
      </SectionHeader>
      <Grid theme={theme} columns={columns}>
        {items.map((item, index) => (
          <GridItem key={index} theme={theme}>
            <CapabilityItem
              icon={item.icon}
              title={item.title}
              description={item.description}
              size="valueProp"
              iconVariant={iconVariant}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
