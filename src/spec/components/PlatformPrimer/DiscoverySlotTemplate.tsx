import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Icon from '@rippling/pebble/Icon';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';

export interface TemplateRecipe {
  icon: string;
  title: string;
  description: string;
  requiredSku?: string;
}

export interface DiscoverySlotTemplateProps {
  linkLabel: string;
  recipes: TemplateRecipe[];
  onViewAll?: () => void;
}

const recipeReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeaturedRecipesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  width: 100%;
`;

const FeaturedRecipesStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  width: 100%;
  max-width: 1120px;
`;

const RecipeSuggestionRow = styled.button<{ $delay: number }>`
  display: flex;
  align-items: flex-start;
  flex: 1 1 300px;
  max-width: 350px;
  min-width: 0;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  cursor: pointer;
  text-align: left;
  transition: background-color 120ms ease, box-shadow 120ms ease;
  animation: ${recipeReveal} 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${({ $delay }) => `${$delay}ms`};

  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
`;

const RecipeIconCircle = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const RecipeRowTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const RecipeRowDescription = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  line-height: 1.4;
`;

const ViewAllLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space200};
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};

  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    text-decoration: underline;
  }
`;

export const DiscoverySlotTemplate: React.FC<DiscoverySlotTemplateProps> = ({
  linkLabel,
  recipes,
  onViewAll,
}) => {
  const { theme } = usePebbleTheme();

  return (
    <FeaturedRecipesSection theme={theme}>
      <ViewAllLink theme={theme} onClick={onViewAll}>
        {linkLabel}
        <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} />
      </ViewAllLink>
      <FeaturedRecipesStack theme={theme}>
        {recipes.map((recipe, idx) => (
          <RecipeSuggestionRow
            key={idx}
            theme={theme}
            $delay={idx * 60}
            onClick={onViewAll}
          >
            <RecipeIconCircle theme={theme}>
              <Icon type={recipe.icon} size={16} />
            </RecipeIconCircle>
            <RecipeTextBlock theme={theme}>
              <RecipeRowTitle theme={theme}>{recipe.title}</RecipeRowTitle>
              <RecipeRowDescription theme={theme}>{recipe.description}</RecipeRowDescription>
            </RecipeTextBlock>
          </RecipeSuggestionRow>
        ))}
      </FeaturedRecipesStack>
    </FeaturedRecipesSection>
  );
};
