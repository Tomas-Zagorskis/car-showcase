'use client';

import { useRouter } from 'next/navigation';
import AppButton from './AppButton';
import { updateSearchParams } from '@/utils';

type ShowMoreProps = {
	pageNumber: number;
	isNext: boolean;
};

const ShowMore: React.FC<ShowMoreProps> = ({ pageNumber, isNext }) => {
	const router = useRouter();

	const handleNavigation = () => {
		const newLimit = (pageNumber + 1) * 10;
		const newPathname = updateSearchParams('limit', newLimit.toString());
		router.push(`${newPathname}#searchbar`);
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
