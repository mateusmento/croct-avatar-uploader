import React from 'react';
import { render, screen } from '@testing-library/react';
import { AvatarUploader } from './AvatarUploader';

test('renders AvatarUploader', () => {
	render(<AvatarUploader />);
});

test('renders AvatarUploader initial layout', () => {
	render(<AvatarUploader />);
	screen.getByText(/Organization Logo/i);
	screen.getByText(/Drop the image here or click to browse./i);
});
