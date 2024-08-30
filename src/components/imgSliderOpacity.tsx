import styled from "styled-components";
const SliderImgOpacity= styled.img`
max-width: 500px;
width: 100%;
opacity: 0;
transition: 1s;
&.loaded{
opacity:1;
}
`;
const SliderImgXScroll= styled.img`
max-width: 500px;
opacity: 1;
transition: 1s;

}
`;

export  {SliderImgOpacity, SliderImgXScroll};