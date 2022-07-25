import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AvatarUploader } from './AvatarUploader';
import userEvent from '@testing-library/user-event';

test('renders AvatarUploader', () => {
	render(<AvatarUploader />);
});

test('renders AvatarUploader initial layout', () => {
	render(<AvatarUploader />);
	screen.getByText(/Organization Logo/i);
	screen.getByText(/Drop the image here or click to browse./i);
});

const readFile = (file: File) => new Promise<string>((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result as string);
	reader.onerror = error => reject(error);
});

test('displays cropping editor for selected file as the avatar image', async () => {
	render(<AvatarUploader />);

	let fileInput = screen.getByTestId("file-input");
	let file = new File(["image"], "image.png", { type: "image/png" });

	userEvent.upload(fileInput, file);

	await waitFor(async () => {
		let preview: HTMLImageElement = screen.getByTestId('avatar-preview');
		expect(preview.src).toBe(await readFile(file));
	});

	screen.getByTestId("close-button");
	screen.getByTestId("save-avatar-button");
});
