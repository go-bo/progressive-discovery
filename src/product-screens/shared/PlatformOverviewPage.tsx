import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import { DiscoveryPageLayout, PageHeroBanner } from '@/spec';
import { PlatformDiagramPlaceholder } from './PlatformDiagramPlaceholder';
import { useUserState } from '@/framework/user-model';
import { getBlocksForProducts, getProductLabel } from './problemBlocksData';
import type { ProblemBlock, RecipeRow, RecipeType, RecipeStatus } from './problemBlocksData';

export type { ProblemBlock, RecipeRow, RecipeType, RecipeStatus };

// ── Layout ──────────────────────────────────────────────

/**
 * Full-bleed hero wrapper that breaks out of PageContent padding.
 * Touches top nav, sidebar edge, and right edge with surface dim background.
 */
const HeroFullBleed = styled.div`
  margin-top: calc(-1 * ${({ theme }) => (theme as StyledTheme).space800});
  margin-left: calc(-1 * ${({ theme }) => (theme as StyledTheme).space1400});
  margin-right: calc(-1 * ${({ theme }) => (theme as StyledTheme).space1400});
  width: calc(100% + 2 * ${({ theme }) => (theme as StyledTheme).space1400});
  background: linear-gradient(
    to bottom,
    ${({ theme }) => (theme as StyledTheme).colorSurfaceDim} 0%,
    ${({ theme }) => (theme as StyledTheme).colorSurface} 100%
  );
  padding-top: ${({ theme }) => (theme as StyledTheme).space1200};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const PageContainer = styled(DiscoveryPageLayout)`
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

// ── Card Grid ───────────────────────────────────────────

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

// ── Problem Card ────────────────────────────────────────

const ProblemCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ProblemTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  flex: 1;
`;

// ── Progress Ring ────────────────────────────────────────

const ProgressRingWrap = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
`;

const ProgressRingLabel = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

interface ProgressRingProps {
  enabled: number;
  total: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ enabled, total }) => {
  const { theme } = usePebbleTheme();
  const size = 44;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? enabled / total : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <ProgressRingWrap theme={theme}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={(theme as StyledTheme).colorOutlineVariant}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={(theme as StyledTheme).colorOnSurface}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <ProgressRingLabel theme={theme}>
        {enabled}/{total}
      </ProgressRingLabel>
    </ProgressRingWrap>
  );
};

// ── Recipe Groups ────────────────────────────────────────

const RecipeSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${({ theme }) => `${(theme as StyledTheme).space300} ${(theme as StyledTheme).space500}`};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  cursor: pointer;
`;

const RecipeGroupLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const RecipeGroupChevron = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 14px;
`;

const RecipeItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => (theme as StyledTheme).space500};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const RecipeRowStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300} 0;
`;

const RecipeIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const RecipeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
`;

const RecipeName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const RecipeDescription = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  line-height: 1.4;
`;

const RecipeAction = styled.div`
  flex-shrink: 0;
`;

// ── AI CTA ──────────────────────────────────────────────

const AICTACardOuter = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => (theme as StyledTheme).colorPrimaryVariant},
    ${({ theme }) => (theme as StyledTheme).colorPrimary}
  );
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: 1px;
`;

const AICTACard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space500};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: calc(${({ theme }) => (theme as StyledTheme).shapeCorner2xl} - 1px);
`;

const AICTAText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  flex: 1;
`;

const AICTATitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const AICTADescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

// ── Page Footer ─────────────────────────────────────────

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space300} 0;
`;

const FooterLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorInfo};

  &:hover {
    text-decoration: underline;
  }
`;

const FooterDivider = styled.span`
  width: 4px;
  height: 4px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

// ── Helpers ─────────────────────────────────────────────

function getEnabledCount(recipes: RecipeRow[]): number {
  return recipes.filter(r => r.status !== 'not_enabled').length;
}

const TYPE_LABELS: Record<RecipeType, string> = {
  report: 'Reports',
  workflow: 'Workflows',
  policy: 'Policies',
};

const TYPE_ORDER: RecipeType[] = ['report', 'workflow', 'policy'];

function groupByType(recipes: RecipeRow[]): { type: RecipeType; label: string; items: RecipeRow[] }[] {
  return TYPE_ORDER
    .map(type => ({
      type,
      label: TYPE_LABELS[type],
      items: recipes.filter(r => r.type === type),
    }))
    .filter(g => g.items.length > 0);
}

// ── Component ───────────────────────────────────────────

export interface PlatformOverviewPageProps {
  onOpenAI?: () => void;
}

export const PlatformOverviewPage: React.FC<PlatformOverviewPageProps> = ({
  onOpenAI,
}) => {
  const { theme } = usePebbleTheme();
  const { purchasedProducts } = useUserState();

  const blocks = useMemo(
    () => getBlocksForProducts(purchasedProducts),
    [purchasedProducts],
  );

  return (
    <>
      <HeroFullBleed theme={theme}>
        <PageHeroBanner
          layout="stacked"
          title="Get more out of Rippling"
          subtitle="See how your products connect and what you can unlock across the platform."
          visual={<PlatformDiagramPlaceholder activeProducts={purchasedProducts.map(p => getProductLabel(p))} />}
        />
      </HeroFullBleed>

      <PageContainer theme={theme} size="md">
      <CardGrid theme={theme}>
        {blocks.map((block, index) => {
          const enabled = getEnabledCount(block.recipes);
          const total = block.recipes.length;
          const groups = groupByType(block.recipes);

          return (
            <ProblemCard key={index} theme={theme}>
              <ProblemHeader theme={theme}>
                <ProgressRing enabled={enabled} total={total} />
                <ProblemTitle theme={theme}>{block.title}</ProblemTitle>
              </ProblemHeader>

              {groups.map(group => (
                <RecipeSection key={group.type}>
                  <RecipeGroupHeader theme={theme}>
                    <RecipeGroupLabel theme={theme}>{group.label}</RecipeGroupLabel>
                    <RecipeGroupChevron theme={theme}>›</RecipeGroupChevron>
                  </RecipeGroupHeader>
                  <RecipeItems theme={theme}>
                    {group.items.map((recipe, idx) => {
                      const isActive = recipe.status !== 'not_enabled';
                      return (
                        <RecipeRowStyled key={idx} theme={theme}>
                          <RecipeIconWrap theme={theme}>
                            <Icon
                              type={recipe.icon}
                              size={16}
                              color={(theme as StyledTheme).colorOnSurfaceVariant}
                            />
                          </RecipeIconWrap>
                          <RecipeContent>
                            <RecipeName theme={theme}>{recipe.title}</RecipeName>
                            <RecipeDescription theme={theme}>{recipe.description}</RecipeDescription>
                          </RecipeContent>
                          <RecipeAction>
                            {isActive ? (
                              <Button
                                appearance={Button.APPEARANCES.OUTLINE}
                                size={Button.SIZES.XS}
                              >
                                Manage
                              </Button>
                            ) : (
                              <Button
                                appearance={Button.APPEARANCES.FILLED}
                                size={Button.SIZES.XS}
                              >
                                Create
                              </Button>
                            )}
                          </RecipeAction>
                        </RecipeRowStyled>
                      );
                    })}
                  </RecipeItems>
                </RecipeSection>
              ))}
            </ProblemCard>
          );
        })}
      </CardGrid>

      <AICTACardOuter theme={theme}>
        <AICTACard theme={theme}>
          <Icon type={Icon.TYPES.RIPPLING_AI} size={28} color={(theme as StyledTheme).colorPrimary} />
          <AICTAText theme={theme}>
            <AICTATitle theme={theme}>Don't see what you need?</AICTATitle>
            <AICTADescription theme={theme}>
              Describe the problem you're trying to solve and Rippling AI will suggest a workflow or report to help.
            </AICTADescription>
          </AICTAText>
          <Button
            appearance={Button.APPEARANCES.OUTLINE}
            size={Button.SIZES.S}
            onClick={onOpenAI}
          >
            Ask Rippling AI
          </Button>
        </AICTACard>
      </AICTACardOuter>

      <FooterRow theme={theme}>
        <FooterLink theme={theme}>
          Browse all workflows
          <Icon type={Icon.TYPES.ARROW_UP_RIGHT} size={14} color={(theme as StyledTheme).colorInfo} />
        </FooterLink>
        <FooterDivider theme={theme} />
        <FooterLink theme={theme}>
          Browse all reports
          <Icon type={Icon.TYPES.ARROW_UP_RIGHT} size={14} color={(theme as StyledTheme).colorInfo} />
        </FooterLink>
        <FooterDivider theme={theme} />
        <FooterLink theme={theme}>
          Browse all policies
          <Icon type={Icon.TYPES.ARROW_UP_RIGHT} size={14} color={(theme as StyledTheme).colorInfo} />
        </FooterLink>
      </FooterRow>
    </PageContainer>
    </>
  );
};

export default PlatformOverviewPage;
