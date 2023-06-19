'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fuels, yearsOfProduction } from '@/constants';
import { AppFilter, CarCard, Hero, SearchBar, ShowMore } from '@/components';
import { CarProps } from '@/types';
import { fetchCars } from '@/utils';

export default function Home() {
	const [allCars, setAllCars] = useState<CarProps[]>([]);
	const [loading, setLoading] = useState(false);

	// search states
	const [manufacturer, setManufacturer] = useState('');
	const [model, setModel] = useState('');

	// filter states
	const [fuel, setFuel] = useState('');
	const [year, setYear] = useState('2020');

	// pagination states
	const [limit, setLimit] = useState(10);

	const getCars = async () => {
		setLoading(true);
		try {
			const result = await fetchCars({
				manufacturer: manufacturer || '',
				year: year || '2022',
				fuel: fuel || '',
				limit: limit || 10,
				model: model || '',
			});

			setAllCars(result);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getCars();
	}, [manufacturer, year, fuel, limit, model]);

	return (
		<main className='overflow-hidden'>
			<Hero />
			<div className='mt-12 padding-x padding-y max-width' id='discover'>
				<div className='home__text-container'>
					<h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
					<p>Explore the cars you might like</p>
				</div>
				<div className='home__filters'>
					<SearchBar setManufacturer={setManufacturer} setModel={setModel} />
					<div className='home__filter-container'>
						<AppFilter title='fuel' options={fuels} setFilter={setFuel} />
						<AppFilter
							title='year'
							options={yearsOfProduction}
							setFilter={setYear}
						/>
					</div>
				</div>

				{allCars.length > 0 ? (
					<section>
						<div className='home__cars-wrapper'>
							{allCars.map(car => (
								<CarCard
									car={car}
									key={`${car.make}${car.model}${car.year}${car.class}${car.combination_mpg}${car.highway_mpg}${car.city_mpg}`}
								/>
							))}
						</div>

						{loading && (
							<div className='mt-16 w-full flex-center'>
								<Image
									src='/loader.svg'
									alt='loader'
									width={50}
									height={50}
									className='object-contain'
								/>
							</div>
						)}

						<ShowMore
							pageNumber={limit / 10}
							isNext={limit > allCars.length}
							setLimit={setLimit}
						/>
					</section>
				) : (
					<div className='home__error-container'>
						<h2 className='text-black text-xl font-bold'>Oops, no results</h2>
					</div>
				)}
			</div>
		</main>
	);
}
