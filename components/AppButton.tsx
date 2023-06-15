'use client';

import { AppButtonProps } from '@/types';

const AppButton: React.FC<AppButtonProps> = ({
	title,
	containerStyles,
	handleClick,
	btnType,
}) => {
	return (
		<button
			disabled={false}
			type={btnType || 'button'}
			className={`custom-btn ${containerStyles}`}
			onClick={handleClick}>
			<span className={`flex-1`}>{title}</span>
		</button>
	);
};

export default AppButton;