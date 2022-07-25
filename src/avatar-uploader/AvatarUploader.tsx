/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMachine } from '@xstate/react';
import { useState } from 'react';
import { ChangeEvent, useRef } from 'react';
import { BsImage, BsX } from 'react-icons/bs';
import { createMachine } from 'xstate';
import Slider from 'react-slider';

const readFile = (file: File) => new Promise<string>((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result as string);
	reader.onerror = error => reject(error);
});

export function AvatarUploader() {

	let [current, send] = useMachine(() => createMachine({
		id: 'avatar-uploader',
		initial: 'view-avatar-upload',
		states: {
			'view-avatar-upload': {
				on: {
					CROP: 'cropping-avatar',
				},
			},
			'cropping-avatar': {
				on: {
					VIEW_AVATAR: 'view-avatar-upload',
				},
			},
		},
	}));

	let [image, setImage] = useState<string>();
	let inputRef = useRef<HTMLInputElement>(null);

	function browserImage() {
		if (inputRef.current) inputRef.current.click();
	}

	async function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
		let file = e.target.files?.[0];
		if (file) {
			setImage(await readFile(file));
			send('CROP');
		}
	}

	return (
		<div css={avatarUploaderCss}>
			{current.matches("view-avatar-upload") && (
				<div css={viewAvatarUploadCss} onClick={browserImage}>
					{image && (
						<AvatarPreview css={avatarPreviewCss}>
							<img className="cropped" src={image} alt="" data-testid="avatar-preview"/>
						</AvatarPreview>
					)}
					<div css={viewAvatarUploadPlaceholderCss}>
						<span><BsImage css={imageIconCss}/> Organization Logo</span>
						<span>Drop the image here or click to browse.</span>
					</div>
					<input type="file" onChange={onFileSelected} hidden ref={inputRef} data-testid="file-input"/>
				</div>
			)}

			{current.matches("cropping-avatar") && (
				<div>
					<AvatarPreview css={avatarPreviewCss}>
						<img className="cropped" src={image} alt="" data-testid="avatar-preview"/>
					</AvatarPreview>

					<div>
						<label>Crop</label>
						<Slider
							trackClassName="slider__track"
							thumbClassName="slider_thumb"
							min={1} max={10} step={.1}
							data-testid="radius-input-slider"
						/>
						<button data-testid="save-avatar-button">Save</button>
					</div>

					<BsX data-testid="close-button"/>
				</div>
			)}
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

let viewAvatarUploadCss = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

let avatarPreviewCss = css`
	margin-right: 50px;
`;

let viewAvatarUploadPlaceholderCss = css`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

let imageIconCss = css`
	margin-right: 10px;
	font-size: 1.2rem;
	vertical-align: middle;
`;

let AvatarPreview = styled.div<{radius?: number}>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 150px;
	height: 150px;
	overflow: hidden;
  clip-path: circle(50% at center);

	.cropped {
		--croppingRadius: ${({radius}) => radius || 1};
		width: calc(100% * var(--croppingRadius));
		height: calc(100% * var(--croppingRadius));
		object-fit: cover;
	}
`;
