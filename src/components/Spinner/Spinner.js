import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";// react-spinners works with emotion
const override = css`
    margin: 0 auto;
    display: block;
`;

export const Spinner = ({ color, height, width, radius, margin }) => {
    return <FadeLoader color={color} loading={true} css={override}
        height={height} width={width} radius={radius} margin={margin}
    />
}