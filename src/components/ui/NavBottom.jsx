import { sidenavLinks } from '@/data/sideNavLinks';
import { usePathname, useRouter } from 'next/navigation';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { IoSaveOutline } from 'react-icons/io5';

export default function NavBottom({ onSave, submitting=false }) {
	const router = useRouter();
	const pathname = usePathname();  // Use this hook to get the current URL

	// Extract route name and ID
	const routeName = `/${pathname.split("/")[1]}`;  // Get the route name
	const id = pathname.split("/")[2];  // Get the dynamic ID

	// Find the current route in the sidenavLinks array
	const routeIndex = sidenavLinks.findIndex(item => item.link === routeName);


	// Handle going back to the previous page
	const handleGoBack = () => {
		if (routeIndex - 1 >= 0) {
			const nextLink = `${sidenavLinks[routeIndex - 1].link}/${id}`;
			router.push(nextLink);  // Navigate to the next route
		}
	};

	// Handle going to the next page, checking bounds of the routeLinks array
	const handleGoNext = () => {
		if (routeIndex + 1 < sidenavLinks.length) {
			// Navigate to the next page, using the current ID
			const nextLink = `${sidenavLinks[routeIndex + 1].link}/${id}`;
			console.log("Next Link:", nextLink);
			router.push(nextLink);  // Navigate to the next route
		}
	};

	return (
		<div className="w-full flex flex-row justify-around items-center gap-4">
			{/* Save & Go Back Button */}
			{routeIndex - 1 >= 0 ?
				<div
					className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white hover:cursor-pointer"
					onClick={handleGoBack}
				>
					<FaAngleDoubleLeft />
					<span>Back</span>
				</div> : <></>
			}

			{/* Save Button */}
			<button
				className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white hover:cursor-pointer"
				onClick={onSave}
				disabled={submitting}
			>
				<IoSaveOutline />
				<span>Save</span>
			</button>

			{/* Save & Continue Button */}
			<div
				className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white hover:cursor-pointer"
				onClick={handleGoNext}
			>
				<span>Next</span>
				<FaAngleDoubleRight />

			</div>
		</div>
	);
}
