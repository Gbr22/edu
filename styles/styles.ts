import seedrandom from 'seedrandom';
import styled, { css } from './styled-components';
import { CardData } from '../data/cards';
import { Theme } from './theme';

export const Centered = css`
    justify-content: center;
    align-items: center;
`

export const FillView = styled.View`
    flex: 1;
`

export const OverlayView = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
`

export const CenteredView = styled.View`${Centered}`
export const CenteredFillView = styled(FillView)`${Centered}`

export function getCardColor(card: CardData, theme: Theme){
    if (card.groups[0]?.isEntireClass){
        return theme.colors.lighterElement;
    }

    return `hsl(${Math.floor(seedrandom(card.groups[0]?.id)()*300)}, 100%, 75%)`;
}