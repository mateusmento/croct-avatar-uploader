/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BsImage } from 'react-icons/bs';

export function AvatarUploader() {
	return (
		<div css={avatarUploaderCss}>
			<span>
				<BsImage/>
				Organization Logo
			</span>
			<span>Drop the image here or click to browse.</span>
		</div>
	);
}

let avatarUploaderCss = css`
	display: flex;
	justify-content: center;
	align-items: center;

	margin: auto;

	background-color: #f2f5f8;
	color: #555;
	width: 600px;
	height: 200px;

	background-image: repeating-linear-gradient(0deg, #c7cdd3, #c7cdd3 9px, transparent 9px, transparent 13px, #c7cdd3 13px), repeating-linear-gradient(90deg, #c7cdd3, #c7cdd3 9px, transparent 9px, transparent 13px, #c7cdd3 13px), repeating-linear-gradient(180deg, #c7cdd3, #c7cdd3 9px, transparent 9px, transparent 13px, #c7cdd3 13px), repeating-linear-gradient(270deg, #c7cdd3, #c7cdd3 9px, transparent 9px, transparent 13px, #c7cdd3 13px);
	background-size: 3px 100%, 100% 3px, 3px 100% , 100% 3px;
	background-position: 0 0, 0 0, 100% 0, 0 100%;
	background-repeat: no-repeat;
`;
