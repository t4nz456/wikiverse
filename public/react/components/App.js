import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	const [pages, setPages] = useState([]);
	const [selectedPage, setSelectedPage] = useState(null);
	const [isAddinPage, setIsAddingPage] = useState(false);

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	const fetchPage = async (slug) => {
		const response = await fetch(`/wiki/${slug}`);
		const data = await response.json();
		setSelectedPage(data);
	};

	const createPage = async (pageData) => {
		const response = await fetch("/wiki", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(pageData),
		});
		const data = await response.json();
		fetchPages();
		setIsAddingPage(false);
	};

	const deletePage = async (slug) => {
		await fetch(`/wiki/${slug}`, {
			method: "DELETE",
		});
		fetchPages();
		setSelectedPage(null);
	};

	const handlePageClick = (slug) => {
		fetchPage(slug);
	};

	const handleAddPageClick = () => {
		setIsAddingPage(true);
	};

	const handleBackToListClick = () => {
		setSelectedPage(null);
	};

	return (
		<main>	
      		<h1>WikiVerse</h1>
				<h2>An interesting 📚</h2>
				<PagesList pages={pages} />

				<div>
						{!selectedPage ? (
							<>
								{isAddingPage ? (
									<Page onSubmit={createPage} onCancel={() => setIsAddingPage(false)} />
								) : (
								<>
										<PagesList pages={pages} onPageClick={handlePageClick} />
										<button onClick={handleAddPageClick}>Add Page</button>
								</>
							)}
						</>
					) : (
					<Page
						page={selectedPage}
						onSubmit={createPage}
						onDelete={deletePage}
						onCancel={handleBackToListClick}
					/>
				)}
        	</div>
		</main>
	);
};