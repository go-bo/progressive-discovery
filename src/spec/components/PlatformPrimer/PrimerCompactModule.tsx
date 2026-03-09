import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { Separator } from '@rippling/pebble/Atoms';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';

export interface CompactRecipe {
  icon: string;
  title: string;
  description: string;
}

export interface CompactTip {
  text: string;
}

export interface PrimerCompactModuleProps {
  statusLabel: string;
  statusIcon?: string;
  title: string;
  subtitle: string;
  cta: string;
  onCtaClick?: () => void;
  templateLabel?: string;
  recipes?: CompactRecipe[];
  maxRecipes?: number;
  tipsLabel?: string;
  tips?: CompactTip[];
}

const ModuleCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  max-width: 640px;
  margin: 0 auto;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const Title = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
  text-align: center;
`;

const RecipeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const RecipeRow = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  cursor: pointer;
  text-align: left;
  transition: background-color 120ms ease;

  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  }
`;

const RecipeIcon = styled.div`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const TipsToggle = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};

  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const TipItem = styled.li`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  line-height: 1.5;
`;

export const PrimerCompactModule: React.FC<PrimerCompactModuleProps> = ({
  statusLabel,
  statusIcon,
  title,
  subtitle,
  cta,
  onCtaClick,
  templateLabel,
  recipes,
  maxRecipes = 3,
  tipsLabel,
  tips,
}) => {
  const { theme } = usePebbleTheme();
  const [tipsExpanded, setTipsExpanded] = useState(false);

  return (
    <ModuleCard theme={theme}>
      <StatusBadge theme={theme}>
        <Icon type={statusIcon ?? Icon.TYPES.INFO_OUTLINE} size={16} />
        {statusLabel}
      </StatusBadge>

      <Title theme={theme}>{title}</Title>
      <Subtitle theme={theme}>{subtitle}</Subtitle>

      <div>
        <Button
          appearance={Button.APPEARANCES.PRIMARY}
          size={Button.SIZES.M}
          onClick={onCtaClick}
        >
          {cta}
        </Button>
      </div>

      {templateLabel && recipes && recipes.length > 0 && (
        <>
          <Separator>{templateLabel}</Separator>
          <RecipeSection theme={theme}>
            {recipes.slice(0, maxRecipes).map((r, i) => (
              <RecipeRow key={i} theme={theme} onClick={onCtaClick}>
                <RecipeIcon theme={theme}>
                  <Icon type={r.icon} size={14} />
                </RecipeIcon>
                <RecipeTitle theme={theme}>{r.title}</RecipeTitle>
              </RecipeRow>
            ))}
          </RecipeSection>
        </>
      )}

      {tipsLabel && tips && tips.length > 0 && (
        <div>
          <TipsToggle theme={theme} onClick={() => setTipsExpanded(!tipsExpanded)}>
            <Icon
              type={tipsExpanded ? Icon.TYPES.CHEVRON_DOWN : Icon.TYPES.CHEVRON_RIGHT}
              size={14}
            />
            {tipsLabel}
          </TipsToggle>
          {tipsExpanded && (
            <TipsList theme={theme}>
              {tips.map((tip, i) => (
                <TipItem key={i} theme={theme}>{tip.text}</TipItem>
              ))}
            </TipsList>
          )}
        </div>
      )}
    </ModuleCard>
  );
};
