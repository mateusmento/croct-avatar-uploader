import { BsImage } from 'react-icons/bs';

export function AvatarUploader() {
	return (
		<div>
			<span>
				<BsImage/>
				Organization Logo
			</span>
			<span>Drop the image here or click to browse.</span>
		</div>
	);
}
