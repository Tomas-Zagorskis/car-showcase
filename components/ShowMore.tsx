'use client';

import AppButton from './AppButton';

type ShowMoreProps = {
	pageNumber: number;
	isNext: boolean;
	setLimit: (limit: number) => void;
};

const ShowMore: React.FC<ShowMoreProps> = ({
	pageNumber,
	isNext,
	setLimit,
}) => {
	const handleNavigation = () => {
		const newLimit = (pageNumber + 1) * 10;
		setLimit(newLimit);
	};
	return (
		<div className='w-full flex-center gap-5 mt-10'>
			{!isNext && (
				<AppButton
					title='Show More'
					btnType='button'
					containerStyles='bg-primary-blue rounded-full text-white'
					handleClick={handleNavigation}
				/>
			)}
		</div>
	);
};

export default ShowMore;
